import { Inject, Injectable } from '@nestjs/common';
import { File } from './../utils/models/files';
import { UploadFileInput } from './inputs/upload.inputs';
import { UpdateFileInput } from './inputs/update.inputs';
import { FilesArgs } from './inputs/files.arg';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async getMany(params: FilesArgs & { user_id: string }): Promise<File[]> {
    const list = this.client.send<File[]>(
      {
        entity: 'files',
        cmd: 'get-many',
      },
      params,
    );

    return await lastValueFrom(list);
  }

  async getOne(params: { _id: string; user_id: string }): Promise<File> {
    const item = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'get-one',
      },
      params,
    );

    return await lastValueFrom(item);
  }

  async createOne(
    data: Pick<UploadFileInput, 'name' | 'folder_id'> & { user_id: string },
  ): Promise<File> {
    const result = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'create-one',
      },
      data,
    );

    return await lastValueFrom(result);
  }

  async updateOne(data: UpdateFileInput & { user_id: string }): Promise<File> {
    const result = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'update-one',
      },
      data,
    );

    return await lastValueFrom(result);
  }

  async deleteOne(params: { _id: string; user_id: string }): Promise<void> {
    const result = this.client.send<any>(
      {
        entity: 'files',
        cmd: 'delete-one',
      },
      params,
    );

    await lastValueFrom(result);
  }
}
