import { FileUpload } from './../utils/inputs/file';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { FileUploadPromiseResponse } from './../utils/inputs/file';

export class UploadService {
  private readonly storePath = process.env.UPLOAD_FOLDER || './uploads';

  async uploadFile(
    file: Promise<FileUpload>,
    user_id: string,
  ): Promise<FileUploadPromiseResponse> {
    const { createReadStream, filename } = await file;

    return new Promise(async (resolve, reject) => {
      const path = join(
        process.cwd(),
        `./${this.storePath}/${user_id}/${filename}`,
      );
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => {
          resolve({
            filename,
            path,
          });
        })
        .on('error', () => {
          reject({ message: 'Can not save file' });
        });
    });
  }
}
