import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
