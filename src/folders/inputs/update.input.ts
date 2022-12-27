import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class UpdateFolderInput {
  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
