import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controller/brand.controller';
import { BrandService } from './service/brand.service';
import { Brand } from '../../database/entities/brand.entity';
import { User } from '../../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, User])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
