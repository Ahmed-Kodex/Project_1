import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarPaginationDto } from '../dto/avatar-pagination.dto';
import { Avatar } from 'src/database/entities/avatar.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepo: Repository<Avatar>,
  ) {}

  async getAll(query: AvatarPaginationDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.avatarRepo.findAndCount({
      skip,
      take: limit,
      // order: { id: 'ASC' },
    });

    return {
      status: 'success',
      message: 'Avatars fetched successfully',
      data: {
        Avatars: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
