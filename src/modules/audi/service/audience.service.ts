import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audience } from '../../../database/entities/audience.entity';

@Injectable()
export class AudienceService {
  constructor(
    @InjectRepository(Audience)
    private readonly audienceRepo: Repository<Audience>,
  ) {}
  async findAll() {
    const audiences = await this.audienceRepo.find({ relations: ['user'] });
    return {
      status: 'success',
      message: 'Audience data fetched successfully',
      data: audiences,
    };
  }
}
