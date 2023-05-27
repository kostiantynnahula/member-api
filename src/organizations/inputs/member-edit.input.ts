import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class MemberEditInput {
  @Field()
  @IsDefined()
  role: string;

  @Field()
  @IsDefined()
  organizationId: string;

  @Field()
  @IsDefined()
  memberId: string;
}
