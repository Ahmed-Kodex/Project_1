import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoType } from '../../database/entities/video-type.entity';
import { VideoTypeController } from './controller/videotype.controller';
import { VideoTypeService } from './service/videotype.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoType])],
  controllers: [VideoTypeController],
  providers: [VideoTypeService],
})
export class VideoTypeModule {}
