import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';

@Injectable()
export class AvatarSeeder {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepo: Repository<Avatar>,
  ) { }
  async run() {
    console.log('➡ Seeding Avatars...');
    const data = [
      { id: 1, name: 'Busy Pilates Mom', thumbnail: 'upload/avatars/pilates_mom.png' },
      { id: 2, name: 'Older Pilates Woman', thumbnail: 'upload/avatars/older_woman.png' },
      { id: 3, name: 'No Avatar', thumbnail: 'upload/avatars/no_avatar.png' },
      { id: 4, name: 'Yoga Enthusiast', thumbnail: 'upload/avatars/yoga_enthusiast.png' },
      { id: 5, name: 'Young Athlete', thumbnail: 'upload/avatars/young_athlete.png' },
      { id: 6, name: 'Casual Jogger', thumbnail: 'upload/avatars/casual_jogger.png' },
      { id: 7, name: 'Fitness Coach', thumbnail: 'upload/avatars/fitness_coach.png' },
      { id: 8, name: 'Meditating Woman', thumbnail: 'upload/avatars/meditating_woman.png' },
      { id: 9, name: 'Gym Trainer', thumbnail: 'upload/avatars/gym_trainer.png' },
      { id: 10, name: 'Happy Mom', thumbnail: 'upload/avatars/happy_mom.png' },
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
