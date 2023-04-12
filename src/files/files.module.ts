import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AWSUploader } from '../utils/services/AWSUploader.service';

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
  providers: [FilesService, FilesResolver, AWSUploader],
})
export class FilesModule {}
