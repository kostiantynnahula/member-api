import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field({ nullable: false })
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;
}
