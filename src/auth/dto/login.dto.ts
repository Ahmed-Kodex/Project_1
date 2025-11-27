import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '******' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
