import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateFileInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsOptional()
  url?: string;

  @Field()
  @IsOptional()
  folder?: string;
}
