import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookService } from './hooks.service';
import { HookController } from './hooks.controller';
import { Hook } from '../../database/entities/hooks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hook])],
  controllers: [HookController],
  providers: [HookService],
  exports: [HookService],
})
export class HookModule {}
