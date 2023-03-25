import { Field, ObjectType } from '@nestjs/graphql';
import { Folder } from './folder.model';
import { Parent } from './parent.model';

@ObjectType()
export class Folders {
  @Field(() => [Folder])
  list: Folder[];
  @Field(() => [Parent])
  parents: Parent[];
}
