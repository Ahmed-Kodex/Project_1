// src/modules/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controller/products.controller';
import { ProductService } from './service/products.service';
import { Product } from 'src/database/entities/product.entity';
import { Brand } from 'src/database/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
