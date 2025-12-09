import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { ProductService } from '../service/products.service';
import {
  CreateProductDto,
  paginatedProductsDto,
} from '../dto/create-product.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAll(@Query() paginationDto: paginatedProductsDto) {
    return this.productService.getAll(paginationDto);
  }
}
