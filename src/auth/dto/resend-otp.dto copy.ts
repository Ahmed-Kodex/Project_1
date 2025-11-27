import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendOtpDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
