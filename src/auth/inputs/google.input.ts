import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GoogleInput {
  @Field()
  accessToken: string;
}