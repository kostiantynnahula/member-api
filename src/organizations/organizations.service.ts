import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrganizationInput } from './inputs/organization.input';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('ORGANIZARTION_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getOrganization(_id) {
    return this.client.send(
      {
        entity: 'organization',
        cmd: 'get-one',
      },
      _id,
    );
  }

  createOrganization(data: OrganizationInput) {
    return this.client.send(
      {
        entity: 'organization',
        cmd: 'create',
      },
      data,
    );
  }

  updateOrganization(data: OrganizationInput & { _id: string }) {
    return this.client.send(
      {
        entity: 'organization',
        cmd: 'update',
      },
      data,
    );
  }
}
