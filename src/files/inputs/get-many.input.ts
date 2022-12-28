import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetManyFileInput {
  @Field()
  page: number;

  @Field()
  limit: number;
}
