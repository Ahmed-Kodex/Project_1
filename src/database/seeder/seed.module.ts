import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoType } from '../entities/video-type.entity';
import { SeedService } from './seed.service';
import { VideoTypeSeeder } from './videotype.seeder';
import { Avatar } from '../entities/avatar.entity';
import { AvatarSeeder } from './avatar.seeder';
import { HooksSeeder } from './hook.seeder';
import { TemplateSeeder } from './template.seeder';
import { VideoSpecSeeder } from './videospecs.seeder';
import { AudienceSeeder } from './audience.seeder';
import { Audience } from '../entities/audience.entity';
import { Hook } from '../entities/hooks.entity';
import { Template } from '../entities/template.entity';
import { VideoSpec } from '../entities/video-spec.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoType,
      Avatar,
      Hook,
      Template,
      VideoSpec,
      Audience,
    ]),
  ],
  providers: [
    SeedService,
    VideoTypeSeeder,
    AvatarSeeder,
    HooksSeeder,
    TemplateSeeder,
    VideoSpecSeeder,
    AudienceSeeder,
  ],
  exports: [SeedService],
})
export class SeedModule {}
