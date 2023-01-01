import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Organization } from './models/organization.model';
import { OrganizationInput } from './inputs/organization.input';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Auth } from './../auth/auth.decorator';
import { User } from './../users/models/user.model';
import { lastValueFrom } from 'rxjs';

@UseGuards(JwtAuthGuard)
@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly service: OrganizationsService) {}

  @Query(() => Organization)
  async organization(@Auth() auth: User) {
    const organization = await lastValueFrom(
      this.service.getOrganizationByCreator(auth._id),
    );

    if (organization) {
      return new NotFoundException();
    }

    return organization;
  }

  @Mutation(() => Organization, {
    name: 'registerOrganization',
  })
  async register(
    @Args('organizationInput') body: OrganizationInput,
    @Auth() auth: User,
  ) {
    const existedOrganization = await lastValueFrom(
      this.service.getOrganizationByCreator(auth._id),
    );

    if (existedOrganization) {
      return new BadRequestException('You already have an organization');
    }

    const organization = await lastValueFrom(
      this.service.createOrganization({ ...body, creator_id: auth._id }),
    );

    return organization;
  }

  @Mutation(() => Organization, {
    name: 'updateOrganization',
  })
  async update(
    @Args('updateOrganizationInput') body: OrganizationInput,
    @Auth() auth: User,
  ) {
    const organization = await lastValueFrom(
      this.service.getOrganizationByCreator(auth._id),
    );

    if (!organization) {
      return new NotFoundException();
    }

    return this.service.updateOrganization({
      _id: organization._id,
      ...body,
    });
  }
}
