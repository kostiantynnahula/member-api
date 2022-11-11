import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class ProfileInput {
  @Field()
  @MinLength(3)
  @MaxLength(45)
  username: string;

  @Field()
  @IsEmail()
  @MaxLength(45)
  email: string;
}