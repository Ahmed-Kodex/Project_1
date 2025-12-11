import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audience } from '../entities/audience.entity';

interface SeedAudience {
  targetAudience: string;
  ageRange: string;
  user?: { id: number };
}

@Injectable()
export class AudienceSeeder {
  constructor(
    @InjectRepository(Audience)
    private readonly audienceRepo: Repository<Audience>,
  ) {}

  async run() {
    const targetAudiences = ['Business', 'Consumer'];
    const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

    const seedData: SeedAudience[] = [];

    targetAudiences.forEach((aud) => {
      ageRanges.forEach((range) => {
        seedData.push({
          targetAudience: aud,
          ageRange: range,
          user: undefined,
        });
      });
    });

    await this.audienceRepo.save(seedData);
    console.log('Audience table seeded successfully');
  }
}
