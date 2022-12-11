import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';
import { InviteStatus } from './../../utils/models/invites';

@InputType()
export class UpdateInviteInput {
  @Field()
  @IsDefined()
  @IsNotEmpty()
  email: InviteStatus;
}
