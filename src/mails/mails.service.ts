import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { SendMailPayload } from './../utils/inputs/mails';

@Injectable()
export class MailsService {
  constructor(
    @Inject('MAIL_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async sendInvite(payload: SendMailPayload): Promise<Observable<any>> {
    const res = this.client.send(
      {
        entity: 'mails',
        cmd: 'send-mail',
      },
      payload,
    );

    await lastValueFrom(res);

    return res;
  }
}
