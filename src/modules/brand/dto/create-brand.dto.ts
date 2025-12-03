import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsOptional()
  @IsString()
  description?: string;
}
