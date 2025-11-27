import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { OtpService } from '../../common/otp/otp.service';
import { MailService } from '../../common/mail/mail.service';
import { User } from '../../users/user.entity';
import { MESSAGES } from '../../config/messages';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private lastVerifiedUserId: number | null = null;

  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ message: string; userId: number; otp: string }> {
    if (!username || !email || !password || !confirmPassword) {
      throw new BadRequestException(MESSAGES.FIELDS_REQUIRED);
    }
    if (password !== confirmPassword) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }
    const user = await this.usersService
      .create(username, email, password)
      .catch(() => {
        throw new InternalServerErrorException(MESSAGES.USER_NOT_CREATED);
      });

    const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
    const otp = await this.otpService.createOtpForUser(user.id, 10);
    await this.mailService.sendOtp(user.email, otp.code);
    return {
      message: MESSAGES.OTP_SENT,
      userId: user.id,
      otp: otp.code,
    };
  }

  // async verifyOtpAndLogin(
  //   username: string,
  //   code: string,
  // ): Promise<{ access_token: string; user: { id: number; username: string } }> {
  //   if (!username || !code)
  //     throw new BadRequestException(MESSAGES.USER_CODE_REQUIRED);
  //   const user = await this.usersService.findByUsername(username);
  //   if (!user) {
  //     throw new UnauthorizedException(MESSAGES.INVALID_USERNAME);
  //   }
  //   const valid = await this.otpService.validateOtp(user.id, code);
  //   if (!valid) {
  //     throw new UnauthorizedException(MESSAGES.INVALID_OTP);
  //   }
  //   try {
  //     await this.usersService.markEmailVerified(user.id);
  //   } catch (err) {
  //     this.logger.error(MESSAGES.FAILED_VERFICATION_MARK, err as any);
  //     throw new InternalServerErrorException(MESSAGES.FAILED_EMAIL_VERFICATION);
  //   }
  //   const payload = { sub: user.id, username: user.username };
  //   const token = this.jwtService.sign(payload);
  //   return {
  //     access_token: token,
  //     user: { id: user.id, username: user.username },
  //   };
  // }

  async verifyOtpAndLogin(
    code: string,
  ): Promise<{ access_token: string; user: { id: number; username: string } }> {
    if (!code) throw new BadRequestException(MESSAGES.OTP_CODE_REQUIRED);

    const otpRecord = await this.otpService.findByCode(code);
    if (!otpRecord) {
      throw new UnauthorizedException(MESSAGES.INVALID_OTP);
    }
    const user = await this.usersService.findById(otpRecord.userId);
    if (!user) {
      throw new UnauthorizedException(MESSAGES.USER_NOT_FOUND);
    }
    const valid = await this.otpService.validateOtp(user.id, code);
    if (!valid) {
      throw new UnauthorizedException(MESSAGES.INVALID_OTP);
    }
    try {
      await this.usersService.markEmailVerified(user.id);
    } catch (err) {
      this.logger.error(MESSAGES.FAILED_VERFICATION_MARK, err);
      throw new InternalServerErrorException(
        MESSAGES.FAILED_VERFICATION_UPDATE,
      );
    }

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    this.lastVerifiedUserId = user.id;

    return {
      access_token: token,
      user: user,
    };
  }

  async login(username: string, password: string) {
    if (!username || !password) {
      throw new UnauthorizedException(MESSAGES.USER_PASSWORD_REQUIRED);
    }
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException(MESSAGES.ACCOUNT_NOT_FOUND);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedException(MESSAGES.INVALID_PASSWORD);
    }
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user: user,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(MESSAGES.EMAIL_NOT_FOUND);
    }
    const otp = await this.otpService.createOtpForUser(user.id, 10);
    await this.mailService.sendOtp(user.email, otp.code);
    return { message: MESSAGES.OTP_SENT, otp: otp.code };
  }

  async resetPassword(newPassword: string, confirmPassword: string) {
    if (!this.lastVerifiedUserId) {
      throw new UnauthorizedException(MESSAGES.OTP_VERIFICATION_REQUIRED);
    }
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }
    const user = await this.usersService.findById(this.lastVerifiedUserId);
    if (!user) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }
    await this.usersService.updatePassword(user.id, newPassword);
    this.lastVerifiedUserId = null;
    return { message: MESSAGES.PASSWORD_CHANGED };
  }

  // for Resend OTP if some mistake

  async resendOtp(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
    const otp = await this.otpService.createOtpForUser(user.id, minutes);
    try {
      await this.mailService.sendOtp(user.email, otp.code);
    } catch (err) {
      this.logger.error('Failed to resend OTP', err as any);
      throw new InternalServerErrorException('Failed to send OTP');
    }
    return { message: 'OTP resent to email' };
  }
}
