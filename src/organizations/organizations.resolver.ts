import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Organization } from './models/organization.model';
import { OrganizationInput } from './inputs/organization.input';

@Resolver((of) => Organization)
export class OrganizationsResolver {
  private mockData = {
    _id: 1,
    name: 'organization name',
    description: 'description',
  };

  @Query(returns => Organization)
  async organization() {
    return this.mockData;
  }

  @Mutation((returns) => Organization, {
    name: 'registerOrganization',
  })
  async register(@Args('organizationInput') body: OrganizationInput) {
    return this.mockData;
  }
}
