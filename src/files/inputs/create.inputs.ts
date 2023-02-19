import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined, IsOptional } from 'class-validator';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@InputType()
export class CreateFileInput {
  @Field()
  @IsNotEmpty()
  @IsOptional()
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
