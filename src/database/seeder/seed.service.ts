import { Injectable } from '@nestjs/common';
import { VideoTypeSeeder } from './videotype.seeder';
import { AvatarSeeder } from './avatar.seeder';
import { HooksSeeder } from './hook.seeder';
import { TemplateSeeder } from './template.seeder';
import { VideoSpecSeeder } from './videospecs.seeder';

@Injectable()
export class SeedService {
  constructor(
    private readonly videoTypeSeeder: VideoTypeSeeder,
    private readonly avatarSeeder: AvatarSeeder,
    private readonly hooksSeeder: HooksSeeder,
    private readonly templateSeeder: TemplateSeeder,
    private readonly videospecsSeeder: VideoSpecSeeder,
  ) {}
  async runAll() {
    console.log('🚀 Starting database seeding...');
    await this.videoTypeSeeder.run();
    await this.avatarSeeder.run();
    await this.hooksSeeder.run();
    await this.templateSeeder.run();
    await this.videospecsSeeder.run();
    console.log('🎉 Seeding completed!');
  }
}
