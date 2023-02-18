import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, callback) => {
          const [name, ext] = file.originalname.split('.');
          const filename = `${name}.${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
