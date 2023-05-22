import { Field, ObjectType } from '@nestjs/graphql';
import { Member } from './member.model';

@ObjectType()
export class Organization {
  @Field({ nullable: false })
  _id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Member])
  members: Member[];
}
