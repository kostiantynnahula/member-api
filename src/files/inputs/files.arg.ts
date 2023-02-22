import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArg } from '../../utils/args/pagination.arg';

@ArgsType()
export class FilesArgs extends PaginationArg {
  @Field({
    nullable: true,
    description: 'Folder id',
  })
  folder_id: string;
}
