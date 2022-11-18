import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attraction } from '../attractions/entities/attraction.entity';
import { User } from '../users/entities/user.entity';
import { TouristRoute } from './entities/tourist-route.entity';
import { TouristRoutesService } from './tourist-routes.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ModelMock<T> {
  public findAll() {
    return [];
  }

  public findAndCountAll() {
    return [];
  }

  public findOne() {
    return {};
  }
  public create() {
    // todo: change this to the property options
    return {};
  }
}

describe('TouristRoutesService', () => {
  let service: TouristRoutesService;
  const touristRouteModelMock = new ModelMock<TouristRoute>();
  const userModelMock = new ModelMock<User>();
  const attractionModelMock = new ModelMock<Attraction>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TouristRoutesService,
        {
          provide: getRepositoryToken(TouristRoute),
          useValue: touristRouteModelMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userModelMock,
        },
        {
          provide: getRepositoryToken(Attraction),
          useValue: attractionModelMock,
        },
      ],
    }).compile();

    service = module.get<TouristRoutesService>(TouristRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
