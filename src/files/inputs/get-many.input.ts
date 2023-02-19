import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetManyFileInput {
  @Field()
  @IsDefined()
  page: number;

  @Field()
  @IsDefined()
  limit: number;
}
