import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Folder {
  @Field({ nullable: false })
  _id: string;

  @Field()
  name: string;
}
