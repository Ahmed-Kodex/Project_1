import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPassDto {
  @ApiProperty({ example: 'abcd@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @ApiProperty({ example: '123456' })
  // @IsNotEmpty()
  // code: string;

  @ApiProperty({ example: 'newpassword' })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'newpassword' })
  @IsNotEmpty()
  confirmPassword: string;
}
