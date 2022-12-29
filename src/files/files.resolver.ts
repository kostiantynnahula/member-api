import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CreateFileInput } from './inputs/create.inputs';
import { UpdateFileInput } from './inputs/update.inputs';
import { GetManyFileInput } from './inputs/get-many.input';
import { FilesService } from './files.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { File } from './models/files.model';
import { Auth } from './../auth/auth.decorator';
import { User } from './../users/models/user.model';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FilesResolver {
  constructor(private readonly service: FilesService) {}

  @Query(() => File)
  async getOne(@Args('id') _id: string, @Auth() auth: User) {
    const file = await this.service.getOne({ _id, user_id: auth._id });

    if (!file) {
      return new NotFoundException();
    }

    return file;
  }

  @Query(() => [File])
  async getMany(@Args('params') params: GetManyFileInput, @Auth() auth: User) {
    return await this.service.getMany({ ...params, user_id: auth._id });
  }

  @Mutation(() => File)
  async createOne(
    @Args('createFileInput') body: CreateFileInput,
    @Auth() auth: User,
  ) {
    return await this.service.createOne({ ...body, user_id: auth._id });
  }

  @Mutation(() => File)
  async updateOne(
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

  @Mutation(() => File)
  async deleteOne(@Args('id') _id: string, @Auth() auth: User) {
    return await this.service.deleteOne({ _id, user_id: auth._id });
  }
}
