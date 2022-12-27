import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersResolver } from './folders.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.FILE_MICROSERVICE_NAME || 'FILE_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.FILE_MICROSERVICE_PORT) || 3005,
        },
      },
    ]),
  ],
  providers: [FoldersService, FoldersResolver],
})
export class FoldersModule {}
