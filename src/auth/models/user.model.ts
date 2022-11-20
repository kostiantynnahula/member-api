import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: false })
  _id?: string;

  @Field()
  email: string;

  @Field()
  username: string;
}
