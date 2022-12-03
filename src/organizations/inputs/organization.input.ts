import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class OrganizationInput {
  @Field()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  @Field()
  @MinLength(3)
  description: string;
}
