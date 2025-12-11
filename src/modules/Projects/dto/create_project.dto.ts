import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiPropertyOptional({ description: 'Audience ID', example: '1' })
  @IsOptional()
  @IsString()
  audienceId?: string;

  @ApiPropertyOptional({ description: 'Video Spec ID', example: '2' })
  @IsOptional()
  @IsString()
  videoSpecId?: string;

  @ApiPropertyOptional({ description: 'Avatar ID', example: '5' })
  @IsOptional()
  @IsString()
  avatarId?: string;

  @ApiPropertyOptional({ description: 'Hook IDs', example: '1,2' })
  @IsOptional()
  @IsString()
  hookIds?: string;

  @ApiPropertyOptional({
    description: 'Script content',
    example: 'Generated script...',
  })
  @IsOptional()
  @IsString()
  script?: string;

  // // Step tracker
  // @Column({ type: 'int', default: 1 })
  // currentStep: number;
}
