import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class CreateInviteInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  @MaxLength(255)
  email: string;
}
