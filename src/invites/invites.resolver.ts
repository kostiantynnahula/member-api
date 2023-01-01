import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  NotFoundException,
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
import { OrganizationsService } from './../organizations/organizations.service';
import { lastValueFrom } from 'rxjs';
import { InviteType } from './../utils/models/invites';
import { CreateInvitePayload } from './../utils/inputs/invites';
import { MailsService } from './../mails/mails.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class InvitesResolver {
  constructor(
    private readonly service: InvitesService,
    private readonly organizationsService: OrganizationsService,
    private readonly mailService: MailsService,
  ) {}

  @Query(() => Invite)
  async getInvite(@Args('id') _id: string) {
    return await this.service.getInvite(_id);
  }

  @Query(() => [Invite])
  async getInvites(@Auth() auth: User) {
    return await this.service.getInvites(auth.email);
  }

  @Mutation(() => Invite)
  async createInvite(
    @Args('createInviteInput') body: CreateInviteInput,
    @Auth() auth: User,
  ) {
    const organization = await lastValueFrom(
      this.organizationsService.getOrganizationByCreator(auth._id),
    );

    const payload: CreateInvitePayload = {
      from: auth.email,
      to: body.email,
      organization: organization._id,
      type: InviteType.ORGANIZATION,
    };

    const invite = await this.service.createInvite(payload);

    await this.mailService.sendInvite({
      from: auth.email,
      to: body.email,
      subject: 'Invite email',
      body: 'Invite email body',
    });

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
