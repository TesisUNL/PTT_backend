import { Module } from '@nestjs/common';
import { CantonsService } from './cantons.service';
import { CantonsController } from './cantons.controller';
import { Canton } from './entities/canton.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Canton])],
  controllers: [CantonsController],
  providers: [CantonsService, FilesService],
  exports: [CantonsService],
})
export class CantonsModule {}
