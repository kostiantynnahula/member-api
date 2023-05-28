import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class MemberAddInput {
  @Field()
  @IsDefined()
  organizationId: string;

  @Field()
  @IsDefined()
  memberId: string;
}
