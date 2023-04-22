import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrganizationInput } from './inputs/organization.input';
import { Organization } from './models/organization.model';
import { User } from './../users/models/user.model';
@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('ORGANIZARTION_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getOrganization(_id) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'get-one',
      },
      _id,
    );
  }

  getOrganizationsByMember(member_id: string) {
    return this.client.send<Organization[]>(
      {
        entity: 'organization',
        cmd: 'get-list',
      },
      member_id,
    );
  }

  getOrganizationByCreator(creator_id: string) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'get-by-creator',
      },
      creator_id,
    );
  }

  createOrganization(
    data: OrganizationInput & {
      creator: Pick<User, '_id' | 'username' | 'email'>;
    },
  ) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'create',
      },
      data,
    );
  }

  updateOrganization(data: OrganizationInput & { _id: string }) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'update',
      },
      data,
    );
  }
}
