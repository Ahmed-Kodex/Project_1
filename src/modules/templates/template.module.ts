import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/database/entities/template.entity';
import { TemplateService } from './service/template.service';
import { TemplateController } from './controller/template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService],
})
export class TemplateModule {}
