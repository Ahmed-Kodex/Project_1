import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SocialLoginDto {
  @ApiProperty({ example: 'username' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ example: 'abcd@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '111111' })
  @IsString()
  socialId: string;

  @ApiProperty({ example: 'google, facebook, apple, ..' })
  @IsString()
  socialType: string;

  // @ApiProperty({ example: 'firstname' })
  // @IsOptional()
  // @IsString()
  // firstName?: string;

  // @ApiProperty({ example: 'lastname' })
  // @IsOptional()
  // @IsString()
  // lastName?: string;

  // @ApiProperty({ example: 'age' })
  // @IsOptional()
  // @IsNumber()
  // age?: number;

  // @ApiProperty({ example: 'countryid' })
  // @IsOptional()
  // @IsNumber()
  // countryId?: number;
}
