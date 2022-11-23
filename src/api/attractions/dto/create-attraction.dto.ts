import { ApiProperty } from '@nestjs/swagger';

export class CreateAttractionDto {
  name: string;
  latitude?: number;
  longitude?: number;
  short_description?: string;
  long_description?: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  cover_image?: string;
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  images?: string[];
  cantonName: string;
}
