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
  ) { }

  async createBrand(dto: CreateBrandDto, logoPath: string, user: User): Promise<Brand> {
    const brandName = dto.brandName?.trim() || '';
    const brandsWithName = await this.brandRepo.find({
      where: { brandName },
      relations: ['user'],
    });
    const sameUserBrand = brandsWithName.find(
      b => b.user && b.user.id === user.id,
    );
    if (sameUserBrand) {
      sameUserBrand.description = dto.description || '';
      sameUserBrand.fileLogo = logoPath;
      sameUserBrand.status = 1;
      sameUserBrand.user = user;
      await this.brandRepo.save(sameUserBrand);
      return (await this.brandRepo.findOne({
        where: { id: sameUserBrand.id },
        relations: ['user'],
      }))!;
    }
    const newBrand = this.brandRepo.create({
      brandName,
      description: dto.description || '',
      fileLogo: logoPath,
      user,
      status: 1,
    });
    await this.brandRepo.save(newBrand);
    return (await this.brandRepo.findOne({
      where: { id: newBrand.id },
      relations: ['user'],
    }))!;
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
