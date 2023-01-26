import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttractionDto } from './create-attraction.dto';

export class UpdateAttractionDto extends PartialType(CreateAttractionDto) {}

export class UploadImageAttractionDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: true })
  images: Express.Multer.File[];
}
