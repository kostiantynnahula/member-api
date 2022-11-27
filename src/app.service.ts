import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createItem(item: Record<string, any>) {
    return this.client.send({ entity: 'item', cmd: 'create' }, item);
  }

  getList() {
    return this.client.send({ entity: 'item', cmd: 'get-list' }, {});
  }

  getItemById(id: number) {
    return this.client.send({ entity: 'item', cmd: 'get-by-id' }, id);
  }
}
