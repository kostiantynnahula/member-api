import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined, IsOptional } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { FileUpload } from './../../utils/inputs/file';

@InputType()
export class CreateFileInput {
  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Field({
    nullable: true,
  })
  @IsOptional()
  folder_id?: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
