import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { Member } from '../models/member.model';

@InputType()
export class MemberAddInput {
  @Field()
  @IsDefined()
  organizationId: string;

  @Field()
  @IsDefined()
  member: Omit<Member, 'role'>;
}
