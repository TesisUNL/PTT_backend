import { Test, TestingModule } from '@nestjs/testing';
import { TouristServicesService } from './tourist-services.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TouristService } from './entities/tourist-service.entity';

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

describe('TouristServicesService', () => {
  let service: TouristServicesService;

  const TouristServiceModelMock = new ModelMock<TouristServicesService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TouristServicesService,
        {
          provide: getRepositoryToken(TouristService),
          useValue: TouristServiceModelMock,
        },
      ],
    }).compile();

    service = module.get<TouristServicesService>(TouristServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
