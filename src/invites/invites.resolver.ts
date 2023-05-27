import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { Invite } from './models/invite.model';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { CreateInviteInput } from './inputs/create-invite.input';
import { UpdateInviteInput } from './inputs/update-invite.input';
import { User } from './../users/models/user.model';
import { lastValueFrom } from 'rxjs';
import { MailsService } from './../mails/mails.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class InvitesResolver {
  constructor(
    private readonly service: InvitesService,
    private readonly mailService: MailsService,
  ) {}

  @Query(() => Invite)
  async getInvite(@Args('id') _id: string) {
    return await this.service.getInvite(_id);
  }

  @Query(() => [Invite])
  async orgInvites(@Args('_id') _id: string) {
    return await this.service.getInvites(_id);
  }

  @Mutation(() => Invite)
  async createInvite(
    @Args('createInviteInput') body: CreateInviteInput,
    @Auth() auth: User,
  ) {
    const { orgId, email } = body;

    const invite = await lastValueFrom(
      this.service.createInvite({
        orgId,
        to: email,
        from: auth.email,
      }),
    );

    await this.mailService.sendInvite(invite);

    return invite;
  }

  @Mutation(() => Invite)
  async updateInvite(
    @Args('updateInviteInput') body: UpdateInviteInput,
    @Auth() auth: User,
  ) {
    const invite = await lastValueFrom(
      this.service.getInviteByEmail({ _id: body._id, email: auth.email }),
    );

    if (!invite) {
      return new NotFoundException('Invite was not found');
    }

    return await this.service.updateInvite(body);
  }
}
