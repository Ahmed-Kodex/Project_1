import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AvatarService } from '../service/avatar.service';
import { AvatarPaginationDto } from '../dto/avatar-pagination.dto';

@ApiTags('Avatar')
@Controller('Avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  @ApiOperation({ summary: 'Get all video types with pagination' })
  async getAll(@Query() query: AvatarPaginationDto) {
    return this.avatarService.getAll(query);
  }
}
