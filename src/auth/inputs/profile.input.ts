import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Min, Max } from 'class-validator';

@InputType()
export class ProfileInput {
  @Field()
  @Min(3)
  @Max(45)
  username: string;

  @Field()
  @IsEmail()
  @Max(45)
  email: string;
}