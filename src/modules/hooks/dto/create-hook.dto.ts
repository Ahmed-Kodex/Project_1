import { IsOptional, IsNotEmpty, IsPositive, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHookDto {
  @ApiProperty({ example: 'This is a new hook' })
  @IsNotEmpty({ message: 'Hook text is required' })
  text: string;
}

export class paginatedHookDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of hooks per page', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
