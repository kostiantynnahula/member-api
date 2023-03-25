import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ParentFolder } from './parent-folder.input';

@InputType()
export class UpdateFolderInput {
  @Field()
  @IsDefined()
  _id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Field(() => [ParentFolder], { nullable: true })
  @IsOptional()
  parents: ParentFolder[];
}
