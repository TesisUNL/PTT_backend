import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class BulkUpdateUserDto extends PartialType(CreateUserDto) {
  ids: string[];
}
