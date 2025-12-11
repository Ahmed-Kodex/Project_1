import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audience } from './../../database/entities/audience.entity';
import { AudienceService } from './service/audience.service';
import { AudienceController } from './controller/audience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Audience])],
  controllers: [AudienceController],
  providers: [AudienceService],
})
export class AudienceModule {}
