import { ApiProperty } from '@nestjs/swagger';

export class CreateCantonDto {
  name: string;
  description?: string;
  province?: string;
  flag_image?: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  presentation_video?: string;
}
