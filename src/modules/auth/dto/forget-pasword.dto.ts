import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPassDto {
  @ApiProperty({ example: 'abcd@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
