import { Module } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { AttractionsController } from './attractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attraction } from './entities/attraction.entity';
import { Canton } from '../cantons/entities/canton.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attraction]),
    TypeOrmModule.forFeature([Canton]),
  ],
  controllers: [AttractionsController],
  providers: [AttractionsService],
})
export class AttractionsModule {}
