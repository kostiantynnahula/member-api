import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';
import { ParentFolder } from './parent-folder.input';

@InputType()
export class CreateFolderInput {
  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Field(() => [ParentFolder])
  @IsDefined()
  parents: ParentFolder[];
}
