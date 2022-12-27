import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/get-many.input';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { FoldersService } from './folders.service';
import { Folder } from './models/folder.model';
import { lastValueFrom } from 'rxjs';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FoldersResolver {
  constructor(private readonly service: FoldersService) {}

  @Query(() => Folder)
  async getOne(@Args('id') _id: string) {
    const folder = await lastValueFrom(this.service.getOne(_id));

    if (!folder) {
      return new NotFoundException();
    }

    return folder;
  }

  @Query(() => [Folder])
  async getMany(@Args('params') params: GetManyFolderInput) {
    const folders = await lastValueFrom(this.service.getMany(params));
    return folders;
  }

  @Mutation(() => Folder)
  async createOne(@Args('createFolderInput') body: CreateFolderInput) {
    const folder = await lastValueFrom(this.service.createOne(body));
    return folder;
  }

  @Mutation(() => Folder)
  async updateOne(@Args('updateFolderInput') body: UpdateFolderInput) {
    const { _id } = body;

    const folder = await lastValueFrom(this.service.getOne(_id));

    if (!folder) {
      return new NotFoundException();
    }

    const result = await lastValueFrom(this.service.updateOne(body));
    return result;
  }

  @Mutation(() => Folder)
  async deleteOne(@Args('id') _id: string) {
    return await lastValueFrom(this.service.deleteOne(_id));
  }
}
