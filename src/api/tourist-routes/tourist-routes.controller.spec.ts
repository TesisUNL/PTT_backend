import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TouristRoutesController } from './tourist-routes.controller';
import { TouristRoutesService } from './tourist-routes.service';
import { Attraction } from '../attractions/entities/attraction.entity';
import { TouristRoute } from './entities/tourist-route.entity';
import { User } from '../users/entities/user.entity';

describe('TouristRoutesController', () => {
  let controller: TouristRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristRoutesController],
      providers: [
        TouristRoutesService,
        {
          provide: getRepositoryToken(TouristRoute),
          useValue: TouristRoute,
        },
        {
          provide: getRepositoryToken(Attraction),
          useValue: Attraction,
        },
        {
          provide: getRepositoryToken(User),
          useValue: User,
        },
      ],
    }).compile();

    controller = module.get<TouristRoutesController>(TouristRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
