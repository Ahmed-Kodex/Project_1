import { Controller, Get } from '@nestjs/common';
import { HookService } from './hooks.service';
import { Hook } from '../../database/entities/hooks.entity';

@Controller('hooks')
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @Get()
  async getAllHooks(): Promise<Hook[]> {
    return this.hookService.findAll();
  }
}
