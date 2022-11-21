import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  _id: true,
  timestamps: true,
})
export class User {
  @Prop()
  _id?: string;

  @Prop({
    required: true,
    unique: true,
    maxlength: 45,
  })
  email: string;

  @Prop({
    required: true,
    maxlength: 45,
  })
  username: string;

  @Prop({
    required: false,
    maxlength: 255,
  })
  facebookId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
