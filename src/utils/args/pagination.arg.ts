import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArg {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
  })
  @IsOptional()
  page = 1;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
  })
  @IsOptional()
  limit: 10;
}
