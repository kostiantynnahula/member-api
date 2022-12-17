import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesResolver } from './invites.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrganizationsModule } from './../organizations/organizations.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.ORGANIZARTION_MICROSERVICE_NAME || 'ORGANIZARTION_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.ORGANIZARTION_MICROSERVICE_NAME) || 3001,
        },
      },
    ]),
    OrganizationsModule,
  ],
  providers: [InvitesService, InvitesResolver],
})
export class InvitesModule {}
