import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'fullName' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'abcd@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '******' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '******' })
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}
