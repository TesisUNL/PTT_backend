import { Module } from '@nestjs/common';
import { TouristRoutesService } from './tourist-routes.service';
import { TouristRoutesController } from './tourist-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristRoute } from './entities/tourist-route.entity';
import { Attraction } from '../attractions/entities/attraction.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TouristRoute]),
    TypeOrmModule.forFeature([Attraction]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TouristRoutesController],
  providers: [TouristRoutesService],
})
export class TouristRoutesModule {}
