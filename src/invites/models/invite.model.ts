import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './../../users/models/user.model';
import { InviteType, InviteStatus } from './../../utils/models/invites';

@ObjectType()
export class Invite {
  @Field({ nullable: false })
  _id: string;

  @Field()
  from: User;

  @Field()
  to: User;

  @Field()
  type: InviteType;

  @Field()
  status: InviteStatus;
}
