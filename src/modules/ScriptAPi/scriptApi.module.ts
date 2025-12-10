import { Module } from '@nestjs/common';
import { ScriptService } from './service/scriptApi.service';
import { ScriptController } from './controller/scriptApi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/database/entities/brand.entity';
import { Product } from 'src/database/entities/product.entity';
import { Avatar } from 'src/database/entities/avatar.entity';
import { Hook } from 'src/database/entities/hooks.entity';
import { VideoSpec } from 'src/database/entities/video-spec.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Product, Avatar, Hook, VideoSpec]),
  ],
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
