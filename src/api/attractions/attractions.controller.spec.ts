import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Canton } from '../cantons/entities/canton.entity';
import { ConfigService } from '../config/config.service';
import { AttractionsController } from './attractions.controller';
import { AttractionsService } from './attractions.service';
import { Attraction } from './entities/attraction.entity';
import { FilesService } from '../files/files.service';
import { TouristService } from '../../tourist-services/entities/tourist-service.entity';

describe('AttractionsController', () => {
  let controller: AttractionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [CantonsModule],
      controllers: [AttractionsController],
      providers: [
        AttractionsService,
        ConfigService,
        FilesService,
        TouristService,
        {
          provide: getRepositoryToken(Attraction),
          useValue: Attraction,
        },
        {
          provide: getRepositoryToken(Canton),
          useValue: Canton,
        },
      ],
    }).compile();

    controller = module.get<AttractionsController>(AttractionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
