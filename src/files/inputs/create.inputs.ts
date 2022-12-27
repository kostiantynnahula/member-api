import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined, IsOptional } from 'class-validator';

@InputType()
export class CreateFileInput {
  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Field()
  @IsOptional()
  url?: string;

  @Field()
  @IsOptional()
  folder: string;
}
