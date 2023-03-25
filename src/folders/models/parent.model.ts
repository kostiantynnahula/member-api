import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Parent {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  closest?: boolean;
}
