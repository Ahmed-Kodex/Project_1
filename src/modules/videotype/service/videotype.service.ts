import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoType } from '../../../database/entities/video-type.entity';
import { VideoPaginationDto } from '../dto/video-pagination.dto';

@Injectable()
export class VideoTypeService {
  constructor(
    @InjectRepository(VideoType)
    private readonly videoTypeRepo: Repository<VideoType>,
  ) {}

  async getAll(query: VideoPaginationDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.videoTypeRepo.findAndCount({
      skip,
      take: limit,
      // order: { id: 'ASC' },
    });

    return {
      status: 'success',
      message: 'Video types fetched successfully',
      data: {
        VideoType: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
