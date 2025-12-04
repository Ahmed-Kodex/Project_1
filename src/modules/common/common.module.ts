import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './service/common.service';
import { CommonController } from './controller/common.controller';
// import { FileEntity } from '../../database/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
