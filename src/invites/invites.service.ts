import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInviteInput } from './inputs/create-invite.input';
import { UpdateInviteInput } from './inputs/update-invite.input';

@Injectable()
export class InvitesService {
  constructor(@Inject('ORGANIZARTION_MICROSERVICE') private readonly client: ClientProxy) {}

  getInvite(_id: string) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'get-one',
      },
      _id,
    );
  }

  getInvites(user_id: string) {
    return this.client.send(
      {
        entity: 'invite',
        cmd: 'get-many',
      },
      user_id,
    );
  }

  createInvite(data: CreateInviteInput) {
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
}
