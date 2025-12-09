import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookService } from './service/hooks.service';
import { HookController } from './controller/hooks.controller';
import { Hook } from '../../database/entities/hooks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hook])],
  controllers: [HookController],
  providers: [HookService],
  exports: [HookService],
})
export class HookModule {}
