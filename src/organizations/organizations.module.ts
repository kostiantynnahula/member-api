import { Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  ],
  providers: [OrganizationsResolver, OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
