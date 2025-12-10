import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Query,
  Request,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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

// Interface for request user
interface IUser {
  id: number;
}

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() dto: CreateProductDto, @Request() req: { user: IUser }) {
    return this.productService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async getAll(@Query() paginationDto: paginatedProductsDto) {
    return this.productService.getAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update a product by ID' })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProductDto,
    @Request() req: { user: IUser },
  ) {
    return this.productService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Get a product by ID for editing' })
  async getOne(@Param('id') id: number, @Request() req: { user: IUser }) {
    return this.productService.getOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  async remove(@Param('id') id: number, @Request() req: { user: IUser }) {
    return this.productService.remove(id, req.user);
  }
}
