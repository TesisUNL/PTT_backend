import { Module } from '@nestjs/common';
import { CantonsService } from './cantons.service';
import { CantonsController } from './cantons.controller';

@Module({
  controllers: [CantonsController],
  providers: [CantonsService],
})
export class CantonsModule {}
