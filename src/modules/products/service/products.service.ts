import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Brand } from 'src/database/entities/brand.entity';
import {
  CreateProductDto,
  paginatedProductsDto,
} from '../dto/create-product.dto';
interface ProductWhereCondition {
  name: string;
  brand?: {
    id: number;
  };
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) { }

  async create(dto: CreateProductDto, user: any) {
    let brand: Brand | null = null;
    if (dto.brand_id) {
      brand = await this.brandRepo.findOne({ where: { id: dto.brand_id } });
      if (!brand) {
        throw new BadRequestException(
          `Brand with ID ${dto.brand_id} does not exist`,
        );
      }
    }

    const whereCondition: ProductWhereCondition = { name: dto.name };
    if (dto.brand_id) {
      whereCondition.brand = { id: dto.brand_id };
    }

    const existingProduct = await this.productRepo.findOne({
      where: whereCondition,
    });
    if (existingProduct) {
      throw new BadRequestException(
        'Product already exists with the same brand',
      );
    }

    const productData: Partial<Product> = {
      name: dto.name,
      description: dto.description,
      brand: brand ?? undefined,
      user: user,      // <-- attach user here
      userId: user.id, // <-- optional, but good to have
    };

    const product = this.productRepo.create(productData);
    await this.productRepo.save(product);

    return {
      status: 'success',
      message: 'Product created successfully',
      data: {
        product: {
          id: product.id,
          name: product.name,
          brand_id: product.brand_id,
          userId: product.userId,
          description: product.description,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
        brand: brand
          ? {
            id: brand.id,
            name: brand.name,
            logo: brand.logo,
            description: brand.description,
            createdAt: brand.createdAt,
            updatedAt: brand.updatedAt,
          }
          : null,
      },
    };
  }

  async getAll(paginationDto: paginatedProductsDto) {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepo.findAndCount({
      relations: ['brand'],
      skip,
      take: limit,
      // order: { createdAt: 'DESC' },
    });
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      brand_id: product.brand_id,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      brand: product.brand
        ? {
          id: product.brand.id,
          name: product.brand.name,
          logo: product.brand.logo,
          description: product.brand.description,
          createdAt: product.brand.createdAt,
          updatedAt: product.brand.updatedAt,
        }
        : null,
    }));
    return {
      status: 'success',
      message: 'Products fetched successfully',
      data: formattedProducts,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
