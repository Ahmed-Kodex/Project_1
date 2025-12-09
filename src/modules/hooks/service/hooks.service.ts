import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hook } from '../../../database/entities/hooks.entity';
import { CreateHookDto } from '../dto/create-hook.dto';
import { User } from '../../../database/entities/user.entity';

@Injectable()
export class HookService {
  constructor(
    @InjectRepository(Hook)
    private hookRepository: Repository<Hook>,
  ) { }


  async findAllPaginated(page = 1, limit = 10): Promise<any> {
    const [hooks, total] = await this.hookRepository.findAndCount({
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    const formattedHooks = hooks.map(hook => ({
      id: hook.id,
      userId: hook.userId,
      text: hook.text,
      is_active: hook.is_active,
      createdAt: hook.createdAt,
      updatedAt: hook.updatedAt,
    }));
    return {
      status: 'success',
      message: 'Hooks fetched successfully',
      data: formattedHooks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateHookDto, user: User): Promise<any> {
    const hook = this.hookRepository.create({
      text: dto.text,
      is_active: true,
      // user: user,
      userId: user.id,
    });
    const savedHook = await this.hookRepository.save(hook);
    return {
      status: 'success',
      message: 'Hook added successfully',
      data: {
        id: savedHook.id,
        userId: savedHook.userId,
        text: savedHook.text,
        is_active: savedHook.is_active,
        createdAt: savedHook.createdAt,
        updatedAt: savedHook.updatedAt,
      },
    };
  }
}
