import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ParentFolder {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  closest?: boolean;
}
