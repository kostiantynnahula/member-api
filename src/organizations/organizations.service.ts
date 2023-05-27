import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrganizationInput } from './inputs/organization.input';
import { Organization } from './models/organization.model';
import { User } from './../users/models/user.model';
import { MemberEditInput } from './inputs/member-edit.input';
import { MemberDeleteInput } from './inputs/member-delete.input';
@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('ORGANIZARTION_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getOrganization(_id: string, member_id: string) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'get-one',
      },
      { _id, member_id },
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

  updateOrganization(
    data: OrganizationInput & { _id: string; member_id: string },
  ) {
    return this.client.send<Organization>(
      {
        entity: 'organization',
        cmd: 'update',
      },
      data,
    );
  }

  editMember(data: MemberEditInput) {
    return this.client.send(
      {
        entity: 'organization-member',
        cmd: 'update',
      },
      data,
    );
  }

  deleteMember(data: MemberDeleteInput) {
    return this.client.send(
      {
        entity: 'organization-member',
        cmd: 'delete',
      },
      data,
    );
  }
}
