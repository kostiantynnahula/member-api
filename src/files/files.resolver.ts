import { Args, Mutation, Query, Resolver, ResolveField } from '@nestjs/graphql';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UploadFileInput } from './inputs/upload.inputs';
import { UpdateFileInput } from './inputs/update.inputs';
import { FilesArgs } from './inputs/files.arg';
import { FilesService } from './files.service';
import { File } from './models/files.model';
import { Auth } from './../auth/auth.decorator';
import { User } from './../users/models/user.model';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { AWSUploader } from './../utils/services/AWSUploader.service';

@Resolver(() => File)
@UseGuards(JwtAuthGuard)
export class FilesResolver {
  constructor(
    private readonly service: FilesService,
    private readonly uploadService: AWSUploader,
  ) {}

  @Query(() => File, {
    name: 'file',
  })
  async file(@Args('id') _id: string, @Auth() auth: User) {
    const file = await this.service.getOne({ _id, user_id: auth._id });

    if (!file) {
      return new NotFoundException();
    }

    return file;
  }

  @Query(() => [File], {
    name: 'files',
  })
  @ResolveField('files', () => [File], { nullable: true })
  async files(@Args() params: FilesArgs, @Auth() auth: User) {
    return await this.service.getMany({ ...params, user_id: auth._id });
  }

  @Mutation(() => File, {
    name: 'uploadFile',
  })
  async upload(
    @Args('uploadFileInput') body: UploadFileInput,
    @Auth() auth: User,
  ) {
    const { file, folder_id } = body;

    console.log(file);

    const { createReadStream, filename } = await file;

    const { writeStream, promise } = this.uploadService.createUploadStream(filename);

    createReadStream().pipe(writeStream);

    const promiseResult = await promise;

    return await this.service.createOne({
      folder_id,
      name: filename,
      user_id: auth._id,
    });
  }

  @Mutation(() => File, {
    name: 'updateFile',
  })
  async update(
    @Args('updateFileInput') body: UpdateFileInput,
    @Auth() auth: User,
  ) {
    const { _id } = body;

    const file = await this.service.getOne({ _id, user_id: auth._id });

    if (!file) {
      return new NotFoundException();
    }

    return await this.service.updateOne({ ...body, user_id: auth._id });
  }

  @Mutation(() => File, {
    name: 'deleteFile',
  })
  async delete(@Args('id') _id: string, @Auth() auth: User) {
    return await this.service.deleteOne({ _id, user_id: auth._id });
  }
}
