import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristAttractionDto } from './create-tourist-attraction.dto';

export class UpdateTouristAttractionDto extends PartialType(
  CreateTouristAttractionDto,
) {}
