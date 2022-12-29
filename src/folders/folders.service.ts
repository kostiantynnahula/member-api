import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Folder } from './../utils/models/files';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';

@Injectable()
export class FoldersService {
  constructor(
    @Inject('FILE_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getMany(
    params: GetManyFolderInput & { user_id: string },
  ): Observable<Folder[]> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'get-many',
      },
      params,
    );
  }

  getOne(params: { _id: string; user_id: string }): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'get-one',
      },
      params,
    );
  }

  createOne(data: CreateFolderInput & { user_id: string }): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'create-one',
      },
      data,
    );
  }

  updateOne(data: UpdateFolderInput & { user_id: string }): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'update-one',
      },
      data,
    );
  }

  deleteOne(params: { _id: string; user_id: string }): Observable<void> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'delete-one',
      },
      params,
    );
  }
}
