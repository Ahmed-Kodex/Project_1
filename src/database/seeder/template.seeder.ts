import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Template } from '../entities/template.entity';
import { User } from 'src/database/entities/user.entity';
import { TemplateType } from 'src/common/enums/templateType.enum';

@Injectable()
export class TemplateSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const templateRepo = this.dataSource.getRepository(Template);
    const userRepo = this.dataSource.getRepository(User);

    const user = await userRepo.findOne({ where: {} });
    if (!user) {
      console.log('No users found, please seed users first.');
      return;
    }

    const templates = [
      // Realistic Cinematic (9)
      {
        thumbnail: 'thumbnail1.jpg',
        img_path: 'template1.png',
        time_length: 30,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail2.jpg',
        img_path: 'template2.png',
        time_length: 35,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail3.jpg',
        img_path: 'template3.png',
        time_length: 40,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail4.jpg',
        img_path: 'template4.png',
        time_length: 45,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail5.jpg',
        img_path: 'template5.png',
        time_length: 50,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail6.jpg',
        img_path: 'template6.png',
        time_length: 55,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail7.jpg',
        img_path: 'template7.png',
        time_length: 60,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail8.jpg',
        img_path: 'template8.png',
        time_length: 65,
        type: TemplateType.REALISTIC_CINEMATIC,
      },
      {
        thumbnail: 'thumbnail9.jpg',
        img_path: 'template9.png',
        time_length: 70,
        type: TemplateType.REALISTIC_CINEMATIC,
      },

      // Influencer UGC (9)
      {
        thumbnail: 'thumbnail10.jpg',
        img_path: 'template10.png',
        time_length: 25,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail11.jpg',
        img_path: 'template11.png',
        time_length: 30,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail12.jpg',
        img_path: 'template12.png',
        time_length: 35,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail13.jpg',
        img_path: 'template13.png',
        time_length: 40,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail14.jpg',
        img_path: 'template14.png',
        time_length: 45,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail15.jpg',
        img_path: 'template15.png',
        time_length: 50,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail16.jpg',
        img_path: 'template16.png',
        time_length: 55,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail17.jpg',
        img_path: 'template17.png',
        time_length: 60,
        type: TemplateType.INFLUENCER_UGC,
      },
      {
        thumbnail: 'thumbnail18.jpg',
        img_path: 'template18.png',
        time_length: 65,
        type: TemplateType.INFLUENCER_UGC,
      },

      // Realistic Cinematic 2 (9)
      {
        thumbnail: 'thumbnail19.jpg',
        img_path: 'template19.png',
        time_length: 30,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail20.jpg',
        img_path: 'template20.png',
        time_length: 35,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail21.jpg',
        img_path: 'template21.png',
        time_length: 40,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail22.jpg',
        img_path: 'template22.png',
        time_length: 45,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail23.jpg',
        img_path: 'template23.png',
        time_length: 50,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail24.jpg',
        img_path: 'template24.png',
        time_length: 55,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail25.jpg',
        img_path: 'template25.png',
        time_length: 60,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail26.jpg',
        img_path: 'template26.png',
        time_length: 65,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },
      {
        thumbnail: 'thumbnail27.jpg',
        img_path: 'template27.png',
        time_length: 70,
        type: TemplateType.REALISTIC_CINEMATIC_2,
      },

      // Tech Dynamic (9)
      {
        thumbnail: 'thumbnail28.jpg',
        img_path: 'template28.png',
        time_length: 20,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail29.jpg',
        img_path: 'template29.png',
        time_length: 25,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail30.jpg',
        img_path: 'template30.png',
        time_length: 30,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail31.jpg',
        img_path: 'template31.png',
        time_length: 35,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail32.jpg',
        img_path: 'template32.png',
        time_length: 40,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail33.jpg',
        img_path: 'template33.png',
        time_length: 45,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail34.jpg',
        img_path: 'template34.png',
        time_length: 50,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail35.jpg',
        img_path: 'template35.png',
        time_length: 55,
        type: TemplateType.TECH_DYNAMIC,
      },
      {
        thumbnail: 'thumbnail36.jpg',
        img_path: 'template36.png',
        time_length: 60,
        type: TemplateType.TECH_DYNAMIC,
      },
    ];

    for (const t of templates) {
      const exists = await templateRepo.findOne({
        where: { img_path: t.img_path },
      });
      if (!exists) {
        const template = templateRepo.create({
          ...t,
          created_at: new Date(),
          updated_at: new Date(),
        });
        await templateRepo.save(template);
      }
    }

    console.log('Templates seeded successfully!');
  }
}
