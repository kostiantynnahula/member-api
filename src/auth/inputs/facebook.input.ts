import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FacebookInput {
  @Field()
  accessToken: string;
  
  @Field()
  id: string;
}