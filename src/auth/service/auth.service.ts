import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  ForbiddenException,
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

  async verifyOtpAndLogin(
    email: string,
    code: string,
  ): Promise<{ access_token: string; verified: any }> {
    if (!email || !code) {
      throw new BadRequestException(MESSAGES.EMAIL_CODE_REQUIRED);
    }
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(MESSAGES.USER_NOT_FOUND);
    }
    const valid = await this.otpService.validateOtp(user.id, code);
    if (!valid) {
      throw new UnauthorizedException(MESSAGES.INVALID_OTP);
    }
    await this.usersService.markEmailVerified(user.id);
    const updatedUser = await this.usersService.findById(user.id);
    if (!updatedUser) {
      throw new ForbiddenException(MESSAGES.UPDATE_ERROR);
    }
    const payload = { sub: updatedUser.id, username: updatedUser.username };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      verified: updatedUser.isEmailVerified,
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
    if (!user.isEmailVerified) {
      throw new UnauthorizedException(MESSAGES.EMAIL_NOT_VERIFIED);
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

  // async forgotPassword(email: string) {
  //   const user = await this.usersService.findByEmail(email);
  //   if (!user) {
  //     throw new BadRequestException(MESSAGES.EMAIL_NOT_FOUND);
  //   }
  //   await this.usersService.markEmailUnverified(user.id);
  //   const tempPassword = Math.random().toString(36).slice(2) + Date.now();
  //   await this.usersService.updatePassword(user.id, tempPassword);
  //   const otp = await this.otpService.createOtpForUser(user.id, 10);
  //   await this.mailService.sendOtp(user.email, otp.code);
  //   return { message: MESSAGES.OTP_SENT, otp: otp.code };
  // }

  async resetPassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException(MESSAGES.OTP_VERIFICATION_REQUIRED);
    }
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }
    await this.usersService.updatePassword(user.id, newPassword);
    // Optionally reset verification after password reset
    // await this.usersService.markEmailUnverified(user.id);
    return { message: MESSAGES.PASSWORD_CHANGED };
  }

  // for Resend OTP if some mistake
  async resendOtp(email: string): Promise<{ message: string; otp: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    await this.usersService.markEmailUnverified(user.id);
    const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
    const otp = await this.otpService.createOtpForUser(user.id, minutes);
    try {
      await this.mailService.sendOtp(user.email, otp.code);
    } catch (err) {
      this.logger.error(MESSAGES.OTP_FAILED, err as any);
      throw new InternalServerErrorException(MESSAGES.OTP_FAILED);
    }
    return {
      message: MESSAGES.OTP_RESENT,
      otp: otp.code,
    };
  }
}
