import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../../database/entities/file.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>,
  ) {}

  async saveFileData(file: Express.Multer.File) {
    const newFile = this.fileRepo.create({
      originalName: file.originalname,
      fileName: file.filename,
      mimetype: file.mimetype,
      // size: file.size,
      path: file.path,
    });

    return this.fileRepo.save(newFile);
  }
}
