import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateFileInput {
  @Field()
  @IsDefined()
  _id: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsOptional()
  folder?: string;
}
