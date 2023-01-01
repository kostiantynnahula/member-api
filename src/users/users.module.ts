import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.USER_MICROSERVICE_NAME || 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.USER_MICROSERVICE_PORT) || 3003,
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
