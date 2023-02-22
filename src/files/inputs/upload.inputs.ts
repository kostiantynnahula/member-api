import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { FileUpload } from './../../utils/inputs/file';

@InputType('UploadFileInput')
export class UploadFileInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({
    nullable: true,
  })
  @IsOptional()
  folder_id?: string;

  @Field(() => GraphQLUpload, {
    nullable: true,
  })
  file: Promise<FileUpload>;
}
