import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Organization } from './models/organization.model';
import { OrganizationInput } from './inputs/organization.input';
import { OrganizationsService } from './organizations.service';
import { UsersService } from './../users/users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Resolver((of) => Organization)
export class OrganizationsResolver {
  public organizationId = '638cd7d8e2d89d6399ea118f';

  constructor(
    private readonly service: OrganizationsService,
    private readonly userService: UsersService,
  ) {}

  @Query(() => Organization)
  async organization() {
    return this.service.getOrganization(this.organizationId);
  }

  @Mutation(() => Organization, {
    name: 'registerOrganization',
  })
  async register(@Args('organizationInput') body: OrganizationInput) {
    return this.service.createOrganization(body);
  }

  @Mutation(() => Organization, {
    name: 'updateOrganization',
  })
  async update(@Args('updateOrganizationInput') body: OrganizationInput) {
    return this.service.updateOrganization({
      _id: this.organizationId,
      ...body,
    });
  }
}
