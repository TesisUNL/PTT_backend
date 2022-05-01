import { Module } from '@nestjs/common';
import { TouristAttractionService } from './tourist-attraction.service';
import { TouristAttractionController } from './tourist-attraction.controller';

@Module({
  controllers: [TouristAttractionController],
  providers: [TouristAttractionService],
})
export class TouristAttractionModule {}
