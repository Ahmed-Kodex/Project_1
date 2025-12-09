import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VideoTypeService } from '../service/videotype.service';
import { VideoPaginationDto } from '../dto/video-pagination.dto';

@ApiTags('Video Types')
@Controller('videotype')
export class VideoTypeController {
  constructor(private readonly videoTypeService: VideoTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all video types with pagination' })
  async getAll(@Query() query: VideoPaginationDto) {
    return this.videoTypeService.getAll(query);
  }
}
