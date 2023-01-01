import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesResolver } from './invites.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrganizationsModule } from './../organizations/organizations.module';
import { MailsModule } from './../mails/mails.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:
          process.env.ORGANIZARTION_MICROSERVICE_NAME ||
          'ORGANIZARTION_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.ORGANIZARTION_MICROSERVICE_PORT) || 3001,
        },
      },
    ]),
    MailsModule,
    OrganizationsModule,
  ],
  providers: [InvitesService, InvitesResolver],
})
export class InvitesModule {}
