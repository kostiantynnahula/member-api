import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class UpdateFolderInput {
  @Field()
  @IsDefined()
  _id: string;

  @Field()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
