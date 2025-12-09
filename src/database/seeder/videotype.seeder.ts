import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoType } from '../entities/video-type.entity';

@Injectable()
export class VideoTypeSeeder {
  constructor(
    @InjectRepository(VideoType)
    private readonly videoTypeRepo: Repository<VideoType>,
  ) {}

  async run() {
    console.log('➡ Seeding Video Types...');

    const data = [
      {
        videoName: 'Product Ad',
        description: 'Showcasing specific products with clear CTAs',
        logo: 'upload/video/Rectangle 19.svg',
      },
      {
        videoName: 'Brand Story',
        description: 'Building emotional connection and brand indentity',
        logo: 'upload/video/Rectangle 17.svg',
      },
      {
        videoName: 'Explainer Video',
        description: 'Educating coustomers about complex features',
        logo: 'upload/video/Rectangle 18.svg',
      },
    ];

    for (const item of data) {
      const record = await this.videoTypeRepo.findOne({
        where: { videoName: item.videoName },
      });

      if (!record) {
        await this.videoTypeRepo.save(item);
        console.log(`Inserted: ${item.videoName}`);
      } else {
        await this.videoTypeRepo.update(record.id, {
          description: item.description,
          logo: item.logo,
        });

        console.log(`Updated: ${item.videoName}`);
      }
    }

    console.log('✔ Video Types seeding finished.');
  }
}
