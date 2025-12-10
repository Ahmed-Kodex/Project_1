import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TemplateService } from '../service/template.service';
import { paginatedTemplateDto } from '../dto/template.dto';

@ApiTags('Templates')
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @ApiOperation({ summary: 'Get templates with pagination and type filter' })
  async getAll(@Query() paginationDto: paginatedTemplateDto) {
    return this.templateService.getAll(paginationDto);
  }
}
