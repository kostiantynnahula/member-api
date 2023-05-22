import { Field, ObjectType } from '@nestjs/graphql';
import { InviteStatus } from './../../utils/models/invites';

@ObjectType()
export class Invite {
  @Field({ nullable: false })
  _id: string;

  @Field()
  status: InviteStatus;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  secret: string;

  @Field()
  organization: string;
}
