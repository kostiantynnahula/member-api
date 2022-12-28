import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CreateFileInput } from './inputs/create.inputs';
import { UpdateFileInput } from './inputs/update.inputs';
import { GetManyFileInput } from './inputs/get-many.input';
import { FilesService } from './files.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { File } from './models/files.model';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FilesResolver {
  constructor(private readonly service: FilesService) {}

  @Query(() => File)
  async getOne(@Args('id') _id: string) {
    const file = await this.service.getOne(_id);

    if (!file) {
      return new NotFoundException();
    }

    return file;
  }

  @Query(() => [File])
  async getMany(@Args('params') params: GetManyFileInput) {
    return await this.service.getMany(params);
  }

  @Mutation(() => File)
  async createOne(@Args('createFileInput') body: CreateFileInput) {
    return await this.service.createOne(body);
  }

  @Mutation(() => File)
  async updateOne(@Args('updateFileInput') body: UpdateFileInput) {
    const { _id } = body;

    const file = await this.service.getOne(_id);

    if (!file) {
      return new NotFoundException();
    }

    return await this.service.updateOne(body);
  }

  @Mutation(() => File)
  async deleteOne(@Args('id') _id: string) {
    return await this.service.deleteOne(_id);
  }
}
