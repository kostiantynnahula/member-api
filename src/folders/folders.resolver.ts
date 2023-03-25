import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CreateFolderInput } from './inputs/create.input';
import { UpdateFolderInput } from './inputs/update.input';
import { GetManyFolderInput } from './inputs/folders.input';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { FoldersService } from './folders.service';
import { Folder } from './models/folder.model';
import { lastValueFrom } from 'rxjs';
import { Auth } from './../auth/auth.decorator';
import { User } from './../users/models/user.model';
import { Folders } from './models/folders.model';

@Resolver(() => Folder)
@UseGuards(JwtAuthGuard)
export class FoldersResolver {
  constructor(private readonly service: FoldersService) {}

  @Query(() => Folder, {
    name: 'folder',
  })
  async folder(@Args('id') _id: string, @Auth() user: User) {
    const folder = await lastValueFrom(
      this.service.getOne({
        _id,
        user_id: user._id,
      }),
    );

    if (!folder) {
      return new NotFoundException();
    }

    return folder;
  }

  @Query(() => Folders, {
    name: 'folders',
  })
  async folders(@Args() params: GetManyFolderInput, @Auth() user: User) {
    const folders = await lastValueFrom(
      this.service.getMany({
        ...params,
        user_id: user._id,
      }),
    );
    return folders;
  }

  @Mutation(() => Folder, {
    name: 'createFolder',
  })
  async create(
    @Args('createFolderInput') body: CreateFolderInput,
    @Auth() user: User,
  ) {
    const folder = await lastValueFrom(
      this.service.createOne({
        ...body,
        user_id: user._id,
      }),
    );
    return folder;
  }

  @Mutation(() => Folder, {
    name: 'updateFolder',
  })
  async update(
    @Args('updateFolderInput') body: UpdateFolderInput,
    @Auth() user: User,
  ) {
    const { _id } = body;

    const folder = await lastValueFrom(
      this.service.getOne({
        _id,
        user_id: user._id,
      }),
    );

    if (!folder) {
      return new NotFoundException();
    }

    const result = await lastValueFrom(
      this.service.updateOne({
        ...body,
        user_id: user._id,
      }),
    );
    return result;
  }

  @Mutation(() => Folder, {
    name: 'deleteFolder',
  })
  async delete(@Args('id') _id: string, @Auth() user: User) {
    const folder = await lastValueFrom(
      this.service.getOne({
        _id,
        user_id: user._id,
      }),
    );

    if (!folder) {
      return new NotFoundException();
    }

    await lastValueFrom(
      this.service.deleteOne({
        _id,
        user_id: user._id,
      }),
    );

    return folder;
  }
}
