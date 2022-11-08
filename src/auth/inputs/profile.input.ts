import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileInput {
  @Field()
  username: string;

  @Field()
  email: string;
}