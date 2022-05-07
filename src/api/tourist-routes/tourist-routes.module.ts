import { Module } from '@nestjs/common';
import { TouristRoutesService } from './tourist-routes.service';
import { TouristRoutesController } from './tourist-routes.controller';

@Module({
  controllers: [TouristRoutesController],
  providers: [TouristRoutesService],
})
export class TouristRoutesModule {}
