import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function BrandInterceptor() {
  return FileInterceptor('fileLogo', {
    storage: diskStorage({
      destination: './upload',
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    }),
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Only image files allowed!'), false);
      }
      cb(null, true);
    },
  });
}
