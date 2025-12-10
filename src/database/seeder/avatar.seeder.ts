import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';

@Injectable()
export class AvatarSeeder {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepo: Repository<Avatar>,
  ) {}
  async run() {
    console.log('➡ Seeding Avatars...');
    const data = [
      {
        id: 1,
        name: 'Denver',
        thumbnail: 'upload/avatars/Rectangle 28020.png',
      },
      { id: 2, name: 'Xena', thumbnail: 'upload/avatars/Rectangle 28021.png' },
      { id: 3, name: 'Bear', thumbnail: 'upload/avatars/Rectangle 28029.png' },
      { id: 4, name: 'Vera', thumbnail: 'upload/avatars/Rectangle 28019.png' },
      {
        id: 5,
        name: 'Beckham',
        thumbnail: 'upload/avatars/Rectangle 28032.png',
      },
      { id: 6, name: 'Bree', thumbnail: 'upload/avatars/Rectangle 28028.png' },
      { id: 7, name: 'Hank', thumbnail: 'upload/avatars/Rectangle 28033.png' },
      {
        id: 8,
        name: 'Teagan',
        thumbnail: 'upload/avatars/Rectangle 28031.png',
      },
      { id: 9, name: 'Hank', thumbnail: 'upload/avatars/Rectangle 28030.png' },
      { id: 10, name: 'Xena', thumbnail: 'upload/avatars/Rectangle 28022.png' },
      { id: 11, name: 'Otto', thumbnail: 'upload/avatars/Rectangle 28023.png' },
      {
        id: 12,
        name: 'Frida',
        thumbnail: 'upload/avatars/Rectangle 28024.png',
      },
      {
        id: 13,
        name: 'Parker',
        thumbnail: 'upload/avatars/Rectangle 28025.png',
      },
      { id: 14, name: 'Ivy', thumbnail: 'upload/avatars/Rectangle 28026.png' },
      {
        id: 15,
        name: 'Dylan',
        thumbnail: 'upload/avatars/Rectangle 28030.png',
      },
    ];

    for (const item of data) {
      const exists = await this.avatarRepo.findOne({
        where: { id: item.id },
      });
      if (!exists) {
        await this.avatarRepo.save(item);
        console.log(`Inserted: ${item.name}`);
      } else {
        await this.avatarRepo.update(item.id, {
          name: item.name,
          thumbnail: item.thumbnail,
        });
        console.log(`Updated: ${item.name}`);
      }
    }
    console.log('✔ Avatar seeding completed.');
  }
}
