import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('ListFolderQuery')
export class GetManyFolderInput {
  @Field({
    nullable: true,
    defaultValue: 1,
  })
  @IsOptional()
  page: number;

  @Field({
    nullable: true,
    defaultValue: 100,
  })
  @IsOptional()
  limit: number;

  @Field({
    nullable: true,
  })
  @IsOptional()
  parent_id: string;
}
