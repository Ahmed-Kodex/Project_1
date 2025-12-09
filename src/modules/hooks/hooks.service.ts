import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hook } from '../../database/entities/hooks.entity';

@Injectable()
export class HookService {
  constructor(
    @InjectRepository(Hook)
    private hookRepository: Repository<Hook>,
  ) {}

  async findAllActive(): Promise<Hook[]> {
    return this.hookRepository.find({ where: { is_active: true } });
  }

  async findAll(): Promise<Hook[]> {
    return this.hookRepository.find();
  }
}
