import { Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';

@Module({
  providers: [OrganizationsResolver],
})
export class OrganizationsModule {}
