import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class ApproveInviteInput {
  @Field()
  @IsDefined()
  @IsNotEmpty()
  token: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  secret: string;
}
