import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarController } from './controller/avatar.controller';
import { AvatarService } from './service/avatar.service';
import { Avatar } from 'src/database/entities/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar])],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}
