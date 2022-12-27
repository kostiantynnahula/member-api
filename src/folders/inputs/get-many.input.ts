import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetManyFolderInput {
  @Field()
  page: number;

  @Field()
  limit: number;
}
