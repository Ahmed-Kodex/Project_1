import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScriptDto {
  @ApiPropertyOptional({ description: 'Brand ID of current user', example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  brand_id?: number;

  @ApiPropertyOptional({
    description: 'Product ID of current user',
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  product_id?: number;

  @ApiPropertyOptional({ description: 'Avatar ID of current user', example: 5 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  avatar_id?: number;

  @ApiPropertyOptional({ description: 'Hook ID of current user', example: 5 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  hook_id?: number;

  @ApiPropertyOptional({
    description: 'VideoSpec ID of current user',
    example: 4,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  video_spec_id?: number;
}
