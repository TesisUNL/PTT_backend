import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttractionDto } from './create-attraction.dto';

export class UpdateAttractionDto extends PartialType(CreateAttractionDto) {}

export class UpdateImageAttractionDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  images?: string[];
}
