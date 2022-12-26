import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './users.schema';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('USER_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async create(data: User): Promise<User> {
    const result = this.client.send<User>(
      {
        entity: 'users',
        cmd: 'create-one',
      },
      data,
    );

    return await lastValueFrom(result);
  }

  async findByEmail(email: string): Promise<User> {
    const result = this.client.send<User>(
      {
        entity: 'users',
        cmd: 'get-one-by-email',
      },
      email,
    );

    return await lastValueFrom(result);
  }

  async findByFacebookId(id: string): Promise<User> {
    const result = this.client.send<User>(
      {
        entity: 'users',
        cmd: 'get-one-by-facebook',
      },
      id,
    );

    return await lastValueFrom(result);
  }

  async findById(_id: string): Promise<User> {
    const result = this.client.send<User>(
      {
        entity: 'users',
        cmd: 'get-one',
      },
      _id,
    );

    return await lastValueFrom(result);
  }

  async updateOne(_id: string, data: Partial<User>): Promise<User> {
    const result = this.client.send<User>(
      {
        entity: 'users',
        cmd: 'update-one',
      },
      { _id, ...data },
    );

    return await lastValueFrom(result);
  }
}
