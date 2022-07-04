export class CreateAttractionDto {
  name: string;
  latitude?: number;
  longitude?: number;
  short_description?: string;
  long_description?: string;
  cover_image?: string;
  images?: string[];
  cantonId: string;
}
