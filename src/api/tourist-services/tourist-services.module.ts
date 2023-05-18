import { Module } from '@nestjs/common';
import { TouristServicesController } from './tourist-services.controller';
import { TouristServicesService } from './tourist-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristService } from './entities/tourist-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TouristService])],
  controllers: [TouristServicesController],
  providers: [TouristServicesService],
})
export class TouristServicesModule {}
