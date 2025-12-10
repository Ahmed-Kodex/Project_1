import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Brand } from 'src/database/entities/brand.entity';
import { Product } from 'src/database/entities/product.entity';
import { Avatar } from 'src/database/entities/avatar.entity';
import { Hook } from 'src/database/entities/hooks.entity';
import { VideoSpec } from 'src/database/entities/video-spec.entity';
import { CreateScriptDto } from '../dto/create-script.dto';
import { User } from 'src/database/entities/user.entity';
// import OpenAI from 'openai';

@Injectable()
export class ScriptService {
  constructor(private dataSource: DataSource) {}

  async generateScript(dto: CreateScriptDto, user: User) {
    const brandRepo = this.dataSource.getRepository(Brand);
    const productRepo = this.dataSource.getRepository(Product);
    const avatarRepo = this.dataSource.getRepository(Avatar);
    const hookRepo = this.dataSource.getRepository(Hook);
    const videoSpecRepo = this.dataSource.getRepository(VideoSpec);

    const brand = dto.brand_id
      ? await brandRepo.findOne({
          where: {
            id: dto.brand_id,
            user: { id: user.id },
          },
          relations: ['user'],
        })
      : null;

    const product = dto.product_id
      ? await productRepo.findOne({
          where: { id: dto.product_id, userId: user.id },
        })
      : null;

    const avatar = dto.avatar_id
      ? await avatarRepo.findOne({
          where: { id: dto.avatar_id, userId: user.id },
        })
      : null;

    const hook = dto.hook_id
      ? await hookRepo.findOne({ where: { id: dto.hook_id, userId: user.id } })
      : null;

    const videoSpec = dto.video_spec_id
      ? await videoSpecRepo.findOne({
          where: { id: dto.video_spec_id, userId: user.id },
        })
      : null;

    const promptParts: string[] = [];

    if (brand) promptParts.push(`Brand: ${brand.name}`);
    if (product) promptParts.push(`Product: ${product.name}`);
    if (avatar) promptParts.push(`Avatar: ${avatar.name}`);
    if (hook) promptParts.push(`Hook: ${hook.text}`);
    if (videoSpec)
      promptParts.push(
        `Video Goal: ${videoSpec.goal}, Length: ${videoSpec.length}s`,
      );

    // const prompt = promptParts.length
    //   ? `Generate a video script with the following details:\n${promptParts.join('\n')}`
    //   : 'Generate a generic video script.';

    // --- OpenAI GPT call ---
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: prompt }],
    //     temperature: 0.7,
    // });
    // const script = completion.choices[0].message?.content || 'Script could not be generated.';
    const script = 'This is a placeholder script for testing purposes.';

    return {
      status: 'success',
      message: 'Script generated successfully',
      data: { script },
    };
  }
}
