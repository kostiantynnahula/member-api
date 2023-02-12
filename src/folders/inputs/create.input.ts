import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined, IsOptional } from 'class-validator';

@InputType()
export class CreateFolderInput {
  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Field({
    nullable: true,
  })
  @IsOptional()
  parent_id?: string;
}
