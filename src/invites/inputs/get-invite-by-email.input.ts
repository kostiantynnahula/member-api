import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail } from 'class-validator';

@InputType()
export class GetInviteByEmail {
  @Field()
  @IsDefined()
  _id: string;

  @Field()
  @IsDefined()
  @IsEmail()
  email: string;
}
