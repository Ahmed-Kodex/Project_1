import { Injectable } from '@nestjs/common';
import { VideoTypeSeeder } from './videotype.seeder';
import { AvatarSeeder } from './avatar.seeder';
import { HooksSeeder } from './hook.seeder';

@Injectable()
export class SeedService {
  constructor(
    private readonly videoTypeSeeder: VideoTypeSeeder,
    private readonly avatarSeeder: AvatarSeeder,
    private readonly hooksSeeder: HooksSeeder,
  ) {}
  async runAll() {
    console.log('🚀 Starting database seeding...');
    await this.videoTypeSeeder.run();
    await this.avatarSeeder.run();
    await this.hooksSeeder.run();
    console.log('🎉 Seeding completed!');
  }
}
