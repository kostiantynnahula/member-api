import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationArg } from './../../utils/args/pagination.arg';

@ArgsType()
export class GetManyFolderInput extends PaginationArg {
  @Field({
    nullable: true,
  })
  @IsOptional()
  parent_id: string;
}
