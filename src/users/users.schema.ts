import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  id: true,
  timestamps: true,
})
export class User {
  @Prop()
  id?: string;
  
  @Prop({
    required: true,
    unique: true,
    maxlength: 45
  })
  email: string;
  
  @Prop({
    required: true,
    maxlength: 45
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);