import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { VideoSpec } from 'src/database/entities/video-spec.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class VideoSpecSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const videoSpecRepo = this.dataSource.getRepository(VideoSpec);
    const userRepo = this.dataSource.getRepository(User);

    // Get all users
    const users = await userRepo.find();
    if (!users.length) {
      console.log('No users found. Please seed users first.');
      return;
    }

    const videoSpecs = [
      { length: 30, goal: 'Product Awareness' },
      { length: 45, goal: 'Brand Introduction' },
      { length: 60, goal: 'Product Tutorial' },
      { length: 15, goal: 'Social Media Teaser' },
      { length: 90, goal: 'Promotional Video' },
    ];

    for (const user of users) {
      for (const spec of videoSpecs) {
        const exists = await videoSpecRepo.findOne({
          where: { userId: user.id, length: spec.length, goal: spec.goal },
        });

        if (!exists) {
          const videoSpec = videoSpecRepo.create({
            userId: user.id,
            length: spec.length,
            goal: spec.goal,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await videoSpecRepo.save(videoSpec);
        }
      }
    }

    console.log('Video Specs seeded successfully!');
  }
}
