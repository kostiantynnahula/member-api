import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  @Field({ nullable: false })
  _id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
