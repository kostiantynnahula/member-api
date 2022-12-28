import { Inject, Injectable } from '@nestjs/common';
import { File } from './../utils/models/files';
import { CreateFileInput } from './inputs/create.inputs';
import { UpdateFileInput } from './inputs/update.inputs';
import { GetManyFileInput } from './inputs/get-many.input';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async getMany(params: GetManyFileInput): Promise<File[]> {
    const list = this.client.send<File[]>(
      {
        entity: 'files',
        cmd: 'get-many',
      },
      params,
    );

    return await lastValueFrom(list);
  }

  async getOne(_id: string): Promise<File> {
    const item = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'get-one',
      },
      _id,
    );

    return await lastValueFrom(item);
  }

  async createOne(data: CreateFileInput): Promise<File> {
    const result = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'create-one',
      },
      data,
    );

    return await lastValueFrom(result);
  }

  async updateOne(data: UpdateFileInput): Promise<File> {
    const result = this.client.send<File>(
      {
        entity: 'files',
        cmd: 'update-one',
      },
      data,
    );

    return await lastValueFrom(result);
  }

  async deleteOne(_id: string): Promise<void> {
    const result = this.client.send<any>(
      {
        entity: 'files',
        cmd: 'delete-one',
      },
      _id,
    );

    await lastValueFrom(result);
  }
}
