import { ObjectType, Field } from '@nestjs/graphql';
import { Folder } from './../../folders/models/folder.model';

@ObjectType()
export class File {
  @Field({ nullable: false })
  _id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  folder: Folder;

  @Field()
  location: string;

  @Field()
  key: string;

  @Field()
  mimetype: string;
}
