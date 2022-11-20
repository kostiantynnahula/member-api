import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';

@InputType()
export class FacebookInput {
  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  accessToken: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  id: string;
}
