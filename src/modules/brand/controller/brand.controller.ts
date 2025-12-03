import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { BrandService } from '../service/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { BrandInterceptor } from '../interceptor/brand.interceptor';
import { MESSAGES } from 'src/config/messages';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Register new brand' })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        brandName: { type: 'string' },
        description: { type: 'string' },
        fileLogo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(BrandInterceptor())
  async addBrand(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateBrandDto,
    @Req() req: any,
  ) {
    const user = req.user;
    const filePath = file?.path ?? null;
    const brand = await this.brandService.createBrand(dto, filePath, user);
    const responseData = {
      id: brand.id,
      brandName: brand.brandName,
      description: brand.description,
      status: brand.status,
      fileLogo: brand.fileLogo,
      user: brand.user,
    };
    return {
      status: 'success',
      message: MESSAGES.BRAND_ADDED,
      data: responseData,
    };
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'View all brands' })
  @Get()
  async getAllBrands() {
    const brands = await this.brandService.getAllBrands();
    const responseData = brands.map((brand) => ({
      id: brand.id,
      brandName: brand.brandName,
      description: brand.description,
      status: brand.status,
      fileLogo: brand.fileLogo,
      user: brand.user,
    }));
    return {
      status: 'success',
      message: MESSAGES.BRAND_FETCHED,
      data: responseData,
    };
  }
}
