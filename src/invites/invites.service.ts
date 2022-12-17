import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateInviteInput } from './inputs/update-invite.input';
import { CreateInvitePayload } from './../utils/inputs/invites';
import { GetInviteByEmail } from './inputs/get-invite-by-email.input';

@Injectable()
export class InvitesService {
  constructor(
    @Inject('ORGANIZARTION_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getInvite(_id: string) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'get-one',
      },
      _id,
    );
  }

  getInvites(email: string) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'get-related-invites',
      },
      email,
    );
  }

  createInvite(data: CreateInvitePayload) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'create-one',
      },
      data,
    );
  }

  updateInvite(data: UpdateInviteInput) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'update-one',
      },
      data,
    );
  }

  getInviteByEmail(data: GetInviteByEmail) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'get-by-email',
      },
      data,
    );
  }
}
