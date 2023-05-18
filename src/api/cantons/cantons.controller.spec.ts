import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CantonsController } from './cantons.controller';
import { CantonsService } from './cantons.service';
import { Canton } from './entities/canton.entity';
import { FilesService } from '../files/files.service';
import { ConfigService } from '../config/config.service';

describe('CantonsController', () => {
  let controller: CantonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CantonsController],
      providers: [
        CantonsService,
        ConfigService,
        FilesService,
        {
          provide: getRepositoryToken(Canton),
          useValue: Canton,
        },
      ],
    }).compile();

    controller = module.get<CantonsController>(CantonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
