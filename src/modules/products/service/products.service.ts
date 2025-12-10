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
  brand?: { id: number };
}

interface IUser {
  id: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  async create(dto: CreateProductDto, user: IUser) {
    let brand: Brand | null = null;
    if (dto.brand_id) {
      brand = await this.brandRepo.findOne({ where: { id: dto.brand_id } });
      if (!brand)
        throw new BadRequestException(
          `Brand with ID ${dto.brand_id} does not exist`,
        );
    }

    const whereCondition: ProductWhereCondition = { name: dto.name };
    if (dto.brand_id) whereCondition.brand = { id: dto.brand_id };

    const existingProduct = await this.productRepo.findOne({
      where: whereCondition,
    });
    if (existingProduct)
      throw new BadRequestException(
        'Product already exists with the same brand',
      );

    const product = this.productRepo.create({
      name: dto.name,
      description: dto.description,
      brand: brand ?? undefined,
      userId: user.id, // ✅ only use foreign key
    });

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

  async update(id: number, dto: CreateProductDto, user: IUser) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!product)
      throw new BadRequestException(`Product with ID ${id} does not exist`);
    if (product.userId !== user.id)
      throw new BadRequestException(
        `You are not allowed to update this product`,
      );

    let brand: Brand | null = null;
    if (dto.brand_id) {
      brand = await this.brandRepo.findOne({ where: { id: dto.brand_id } });
      if (!brand)
        throw new BadRequestException(
          `Brand with ID ${dto.brand_id} does not exist`,
        );
    }

    product.name = dto.name ?? product.name;
    product.description = dto.description ?? product.description;
    product.brand = brand ?? product.brand;

    await this.productRepo.save(product);

    return {
      status: 'success',
      message: 'Product updated successfully',
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        brand_id: product.brand?.id ?? null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    };
  }

  async remove(id: number, user: IUser) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product)
      throw new BadRequestException(`Product with ID ${id} does not exist`);
    if (product.userId !== user.id)
      throw new BadRequestException(
        `You are not allowed to delete this product`,
      );

    await this.productRepo.remove(product);

    return { status: 'success', message: 'Product deleted successfully' };
  }

  async getOne(id: number, user: IUser) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!product)
      throw new BadRequestException(`Product with ID ${id} does not exist`);
    if (product.userId !== user.id)
      throw new BadRequestException(`You are not allowed to view this product`);

    return {
      status: 'success',
      message: 'Product fetched successfully',
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        brand_id: product.brand?.id ?? null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
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
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
