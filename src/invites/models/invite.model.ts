import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './../../users/models/user.model';
import { InviteType, InviteStatus } from './../../utils/models/invites';

@ObjectType()
export class Invite {
  @Field({ nullable: false })
  _id: string;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  type: InviteType;

  @Field()
  status: InviteStatus;
}
