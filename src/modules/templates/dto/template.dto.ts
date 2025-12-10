import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Max, Min } from 'class-validator';
import { TemplateType } from 'src/common/enums/templateType.enum';

export class paginatedTemplateDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of templates per page',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiProperty({
    description: 'Template type filter',
    enum: TemplateType,
    default: TemplateType.REALISTIC_CINEMATIC,
  })
  @IsOptional()
  type: TemplateType = TemplateType.REALISTIC_CINEMATIC;
}
