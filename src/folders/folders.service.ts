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

  getMany(params: GetManyFolderInput): Observable<Folder[]> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'get-many',
      },
      params,
    );
  }

  getOne(_id): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'get-one',
      },
      _id,
    );
  }

  createOne(data: CreateFolderInput): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'create-one',
      },
      data,
    );
  }

  updateOne(data: UpdateFolderInput): Observable<Folder> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'update-one',
      },
      data,
    );
  }

  deleteOne(_id: string): Observable<void> {
    return this.client.send(
      {
        entity: 'folder',
        cmd: 'delete-one',
      },
      _id,
    );
  }
}
