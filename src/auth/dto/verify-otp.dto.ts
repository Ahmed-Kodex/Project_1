import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  // @ApiProperty({ example: 'username' })
  // @IsString()
  // @IsNotEmpty()
  // username: string;

  @ApiProperty({ example: '000000' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
