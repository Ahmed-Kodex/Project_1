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

  async createBrand(
    dto: CreateBrandDto,
    logoPath: string,
    user: User,
  ): Promise<Brand> {
    const name = dto.brandName?.trim() || '';

    const brandsWithName = await this.brandRepo.find({
      where: { name },
      relations: ['user'],
    });

    const sameUserBrand = brandsWithName.find(
      (b) => b.user && b.user.id === user.id,
    );

    if (sameUserBrand) {
      sameUserBrand.description = dto.description || '';
      sameUserBrand.logo = logoPath;
      sameUserBrand.user = user;
      await this.brandRepo.save(sameUserBrand);
      const updatedBrand = await this.brandRepo.findOne({
        where: { id: sameUserBrand.id },
        relations: ['user'],
      });

      if (!updatedBrand) throw new Error('Brand update failed');
      return updatedBrand;
    }
    const newBrand = this.brandRepo.create({
      name,
      description: dto.description || '',
      logo: logoPath,
      user,
    });
    await this.brandRepo.save(newBrand);
    const savedBrand = await this.brandRepo.findOne({
      where: { id: newBrand.id },
      relations: ['user'],
    });

    if (!savedBrand) throw new Error('Brand creation failed');
    return savedBrand;
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
        brandName: brand.name,
        description: brand.description,
        // status: brand.status,
        fileLogo: brand.logo,
        user: null,
      };
    }
    const userWithoutPassword = Object.fromEntries(
      Object.entries(brand.user).filter(([key]) => key !== 'password'),
    );
    return {
      id: brand.id,
      brandName: brand.name,
      description: brand.description,
      // status: brand.status,
      fileLogo: brand.logo,
      user: userWithoutPassword,
    };
  }
}
