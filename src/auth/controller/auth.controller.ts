import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { SignupDto } from '../dto/signup.dto';
import { ForgetPassDto } from '../dto/forget-pasword.dto';
import { ResetPassDto } from '../dto/reset-pasword.dto';
import { ResendOtpDto } from '../dto/resend-otp.dto copy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: SignupDto })
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(
      body.username,
      body.email,
      body.password,
      body.confirmPassword,
    );
  }
  @Post('verify-otp')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtpAndLogin(body.code);
    // return this.authService.verifyOtpAndLogin(body.username, body.code);
  }
  @Post('resend-otp')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: ResendOtpDto })
  async resendOtp(@Body() body: ResendOtpDto) {
    return this.authService.resendOtp(body.email);
  }
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
  @Post('forget-password')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: ForgetPassDto })
  async forgotPassword(@Body() body: ForgetPassDto) {
    return this.authService.forgotPassword(body.email);
  }
  @Post('verify-otp2')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp2(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtpAndLogin(body.code);
  }
  @Post('reset-password')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: ResetPassDto })
  async resetPassword(@Body() body: ResetPassDto) {
    return this.authService.resetPassword(
      // body.email,
      // body.code,
      body.newPassword,
      body.confirmPassword,
    );
  }
}
