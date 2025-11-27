import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPassDto {
  // @ApiProperty({ example: 'user@example.com' })
  // @IsNotEmpty()
  // email: string;

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
