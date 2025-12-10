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
import { UsersService } from '../../users/service/users.service';
import { OtpService } from '../../../common/otp/otp.service';
import { MailService } from '../../../common/mail/mail.service';
// import { User } from '../../../database/entities/user.entity';
import { MESSAGES } from '../../../config/messages';
import { SocialLoginDto } from '../dto/SocialLogin.dto';

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
  ): Promise<{ message: string; otp: string }> {
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
    // const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
    const otp = await this.otpService.createOtpForUser(user.id, 10);
    await this.mailService.sendOtp(user.email, otp.code);
    return {
      message: MESSAGES.OTP_SENT,
      // userId: user.id,
      otp: otp.code,
    };
  }
  async verifyOtpAndLogin(
    email: string,
    code: string,
    // ): Promise<{ access_token: string; verified: any }> {
  ): Promise<{ verified: any; message: string }> {
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
    // const payload = { sub: updatedUser.id, username: updatedUser.username };
    // const token = this.jwtService.sign(payload);
    return {
      message: 'Account Verified',
      verified: updatedUser.isEmailVerified,
      // access_token: token,
    };
  }
  async login(username: string, password: string, message?: string) {
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const matched = (await bcrypt.compare(password, user.password)) as boolean;
    if (!matched) {
      throw new UnauthorizedException(MESSAGES.INVALID_PASSWORD);
    }
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      message: message || MESSAGES.SUCCESS_LOGIN,
      data: {
        user: user,
        access_token,
      },
    };
  }
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
  async resendOtp(email: string): Promise<{ message: string; otp: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    await this.usersService.markEmailUnverified(user.id);
    const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10);
    const otp = await this.otpService.createOtpForUser(user.id, minutes);
    try {
      await this.mailService.sendOtp(user.email, otp.code);
    } catch (err) {
      this.logger.error(MESSAGES.OTP_FAILED, err);
      throw new InternalServerErrorException(MESSAGES.OTP_FAILED);
    }
    return {
      message: MESSAGES.OTP_RESENT,
      otp: otp.code,
    };
  }
  async socialLogin(dto: SocialLoginDto) {
    const { email, socialId, socialType, username } = dto;
    const existingByEmail = await this.usersService.findByEmail(email);
    if (existingByEmail) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXIST);
    }
    const existingBySocialId = await this.usersService.findBySocialId(socialId);
    if (existingBySocialId) {
      throw new BadRequestException(MESSAGES.ACCOUNT_ALREADY_LINKED);
    }
    const user = await this.usersService.createSocialUser({
      email,
      username: username ?? email.split('@')[0],
      socialId,
      socialType,
      isEmailVerified: true,
    });
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      message: MESSAGES.SUCCESS_LOGIN,
      data: {
        user,
        accessToken,
      },
    };
  }
}
