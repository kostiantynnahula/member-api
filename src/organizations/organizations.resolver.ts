import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Organization } from './models/organization.model';
import { OrganizationInput } from './inputs/organization.input';
import { OrganizationsService } from './organizations.service';

@Resolver((of) => Organization)
export class OrganizationsResolver {
  constructor(private readonly service: OrganizationsService) {}

  @Query(() => Organization)
  async organization() {
    return this.service.getOrganization('431386a9-f42d-41a2-abda-7193e900ba0a');
  }

  @Mutation(() => Organization, {
    name: 'registerOrganization',
  })
  async register(@Args('organizationInput') body: OrganizationInput) {
    return this.service.createOrganization(body);
  }
}
