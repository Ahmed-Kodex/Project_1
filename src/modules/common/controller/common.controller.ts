import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadFileDto } from '../dto/upload-file.dto';
import { MESSAGES } from 'src/config/messages';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  @Post('upload-file')
  @ApiOperation({ summary: 'Upload any type of file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const uniqueName = file.originalname;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const cleanPath = file.path.replace(/\\/g, '/');
    return {
      message: MESSAGES.FILE_UPLOADED,
      data: {
        originalName: file.originalname,
        fileName: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: cleanPath,
        url: `/upload/${file.filename}`,
      },
    };
  }
}
