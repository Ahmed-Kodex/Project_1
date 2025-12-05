import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { BrandService } from '../service/brand.service';
import { CreateBrandDto, paginatedBrandDto } from '../dto/create-brand.dto';
import { MESSAGES } from 'src/config/messages';
import { User } from 'src/database/entities/user.entity';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Register new brand' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async addBrand(@Body() dto: CreateBrandDto, @Req() req: { user: User }) {
    const cleanLogoPath = dto.logoPath
      ?.replace(/\//g, '\\')
      .replace(/\\\\+/g, '\\')
      .replace(/\\+/g, '\\');
    const brand = await this.brandService.createBrand(
      dto,
      cleanLogoPath,
      req.user,
    );
    return {
      status: 'success',
      message: MESSAGES.BRAND_ADDED,
      data: this.brandService.formatBrandResponse(brand),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'View all brands' })
  @Get()
  async getAllBrands(@Query() paginationDto: paginatedBrandDto) {
    return this.brandService.findAllpaginated(paginationDto);
  }
}
