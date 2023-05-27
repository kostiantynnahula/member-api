import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class MemberDeleteInput {
  @Field()
  @IsDefined()
  organizationId: string;

  @Field()
  @IsDefined()
  memberId: string;
}
