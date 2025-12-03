import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { SignupDto } from '../dto/signup.dto';
// import { ForgetPassDto } from '../dto/forget-pasword.dto';
import { ResetPassDto } from '../dto/reset-pasword.dto';
import { ResendOtpDto } from '../dto/resend-otp.dto copy';
import { SocialLoginDto } from '../dto/SocialLogin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
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
  @ApiOperation({ summary: 'Verify OTP for email verification' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtpAndLogin(body.email, body.code);
  }
  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to user email' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: ResendOtpDto })
  async resendOtp(@Body() body: ResendOtpDto) {
    return this.authService.resendOtp(body.email);
  }
  @Post('login')
  @ApiOperation({ summary: 'Login User with email and password' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
  @Post('update-password')
  @ApiOperation({ summary: 'Update the password' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: ResetPassDto })
  async resetPassword(@Body() body: ResetPassDto) {
    return this.authService.resetPassword(
      // body.code,
      body.email,
      body.newPassword,
      body.confirmPassword,
    );
  }
  @Post('social-login')
  @ApiOperation({ summary: 'Social Login (Google, Facebook, ..)' })
  @ApiConsumes('application/json')
  // @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: SocialLoginDto })
  async socialLogin(@Body() dto: SocialLoginDto) {
    return this.authService.socialLogin(dto);
  }
}
