import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';

@InputType()
export class GoogleInput {
  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  accessToken: string;
}