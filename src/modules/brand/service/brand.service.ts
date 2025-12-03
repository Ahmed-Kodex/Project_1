import { Injectable, BadRequestException } from '@nestjs/common';
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
  ) {}
  async createBrand(dto: CreateBrandDto, filePath: string, user: User) {
    if (!dto.brandName) {
      throw new BadRequestException(MESSAGES.BRAND_NAME_REQUIRED);
    }
    let brand = await this.brandRepo.findOne({
      where: { brandName: dto.brandName },
    });
    if (brand) {
      brand.description = dto.description ?? brand.description;
      brand.fileLogo = filePath ?? brand.fileLogo;
      brand.user = user;
      brand.status = 1;
    } else {
      brand = this.brandRepo.create({
        brandName: dto.brandName,
        description: dto.description,
        fileLogo: filePath,
        user: user,
        status: 1,
      });
    }
    return await this.brandRepo.save(brand);
  }
  async getAllBrands() {
    return this.brandRepo.find({ relations: ['user'] });
  }
}
