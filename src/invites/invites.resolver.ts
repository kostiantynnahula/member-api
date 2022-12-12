import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  UseGuards,
  // BadRequestException,
  // NotFoundException,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { Invite } from './models/invite.model';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { CreateInviteInput } from './inputs/create-invite.input';
import { UpdateInviteInput } from './inputs/update-invite.input';
import { User } from './../users/models/user.model';

@Resolver()
@UseGuards(JwtAuthGuard)
export class InvitesResolver {
  constructor(private readonly service: InvitesService) {}

  @Query(() => Invite)
  async getInvite(@Args('id') _id: string) {
    return await this.service.getInvite(_id);
  }

  @Query(() => [Invite])
  async getInvites(@Auth() auth: User) {
    return await this.service.getInvites(auth._id);
  }

  @Mutation(() => Invite)
  async createInvite(
    @Args('createInviteInput') body: CreateInviteInput,
    @Auth() auth: User,
  ) {
    return await this.service.createInvite(body);
  }

  @Mutation(() => Invite)
  async updateInvite(
    @Args('updateInviteInput') body: UpdateInviteInput,
    @Auth() auth: User,
  ) {
    return await this.service.updateInvite(body);
  }
}
