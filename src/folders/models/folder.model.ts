import { Field, ObjectType } from '@nestjs/graphql';
import { Parent } from './parent.model';

@ObjectType()
export class Folder {
  @Field({ nullable: false })
  _id: string;

  @Field()
  name: string;

  @Field(() => [Parent])
  parents: Parent[];
}
