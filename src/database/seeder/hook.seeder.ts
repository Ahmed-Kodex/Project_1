import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Hook } from '../../database/entities/hooks.entity';

@Injectable()
export class HooksSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    const hookRepository = this.dataSource.getRepository(Hook);

    const hooksData = [
      { text: 'Start with amazing offer!', is_active: true },
      { text: 'Grab attention in 3 seconds!', is_active: true },
    ];

    for (const hook of hooksData) {
      const existing = await hookRepository.findOne({ where: { text: hook.text } });
      if (!existing) {
        await hookRepository.save(hook);
      }
    }

    console.log('Hooks seeded successfully!');
  }
}
