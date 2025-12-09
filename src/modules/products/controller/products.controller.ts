import { Controller, Post, Get, Body, UseGuards, Query, Request } from '@nestjs/common';
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

  @Post('create')
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() dto: CreateProductDto, @Request() req) {
    const user = req.user; // this comes from JwtAuthGuard
    return this.productService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAll(@Query() paginationDto: paginatedProductsDto) {
    return this.productService.getAll(paginationDto);
  }
}
