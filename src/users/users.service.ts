import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: User) {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByFacebookId(id: string): Promise<User> {
    return await this.userModel
      .findOne({ facebookId: id }, null, { lean: true })
      .exec();
  }

  async findById(_id: string) {
    return await this.userModel.findOne({ id: _id }).exec();
  }

  async updateOne(_id: string, data: Partial<User>) {
    return await this.userModel.findOneAndUpdate({ id: _id }, { ...data });
  }
}
