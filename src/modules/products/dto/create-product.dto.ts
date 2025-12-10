import { IsNotEmpty, IsOptional, IsPositive, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Product name' })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @ApiProperty({ example: '1, 2, 3' })
  @IsNotEmpty({ message: 'Brand ID is required' })
  brand_id: number;

  @ApiProperty({ example: 'Latest Product', required: false })
  @IsOptional()
  description?: string;
}
export class paginatedProductsDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of users per page', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
