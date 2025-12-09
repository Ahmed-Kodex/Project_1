import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoType } from '../entities/video-type.entity';

import { SeedService } from './seed.service';
import { VideoTypeSeeder } from './videotype.seeder';
import { Avatar } from '../entities/avatar.entity';
import { AvatarSeeder } from './avatar.seeder';
import { HooksSeeder } from './hook.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([VideoType, Avatar, HooksSeeder])],
  providers: [SeedService, VideoTypeSeeder, AvatarSeeder, HooksSeeder],
  exports: [SeedService],
})
export class SeedModule { }
