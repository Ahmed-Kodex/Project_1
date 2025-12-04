import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../../database/entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { User } from '../../../database/entities/user.entity';
import { MESSAGES } from 'src/config/messages';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
    // @InjectRepository(User)
    // private userRepo: Repository<User>,
  ) {}

  async createBrand(dto: CreateBrandDto, logoPath: string, user: User) {
  const brandName = dto.brandName?.trim() || '';
  let brand = await this.brandRepo.findOne({
    where: { brandName },
    relations: ['user'],
  });
  if (brand) {
    brand.description = dto.description || '';
    brand.fileLogo = logoPath;
    brand.status = 1;
    brand.user = user;
    await this.brandRepo.save(brand);
  } else {
    brand = this.brandRepo.create({
      brandName,
      description: dto.description || '',
      fileLogo: logoPath,
      user,
      status: 1,
    });
    await this.brandRepo.save(brand);
  }
  const fullBrand = await this.brandRepo.findOne({
    where: { id: brand.id },
    relations: ['user'],
  });
  return fullBrand!;
}


  async getAllBrands() {
    return this.brandRepo.find({ relations: ['user'] });
  }
  async findAllpaginated({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [brands, total] = await this.brandRepo.findAndCount({
      skip,
      take: limit,
      // order: { id: 'DESC' },
      relations: ['user'],
    });
    const formattedBrands = brands.map((brand) =>
      this.formatBrandResponse(brand),
    );
    return {
      message: MESSAGES.BRAND_FETCHED,
      brands: formattedBrands,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  formatBrandResponse(brand: Brand) {
    if (!brand.user) {
      return {
        id: brand.id,
        brandName: brand.brandName,
        description: brand.description,
        status: brand.status,
        fileLogo: brand.fileLogo,
        user: null,
      };
    }
    const userWithoutPassword = Object.fromEntries(
      Object.entries(brand.user).filter(([key]) => key !== 'password'),
    );
    return {
      id: brand.id,
      brandName: brand.brandName,
      description: brand.description,
      status: brand.status,
      fileLogo: brand.fileLogo,
      user: userWithoutPassword,
    };
  }
}
