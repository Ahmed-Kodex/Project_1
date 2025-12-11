import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Template } from 'src/database/entities/template.entity';
import { paginatedTemplateDto } from '../dto/template.dto';
import { TemplateType } from 'src/common/enums/templateType.enum';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
  ) {}

  async getAll(dto: paginatedTemplateDto) {
    const {
      page = 1,
      limit = 10,
      type = TemplateType.REALISTIC_CINEMATIC,
    } = dto;
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Template> = {
      type,
    };
    const [templates, total] = await this.templateRepo.findAndCount({
      where,
      skip,
      take: limit,
    });

    return {
      status: 'success',
      message: 'Templates fetched successfully',
      data: templates,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
