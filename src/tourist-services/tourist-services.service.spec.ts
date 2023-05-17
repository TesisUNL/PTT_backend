import { Test, TestingModule } from '@nestjs/testing';
import { TouristServicesService } from './tourist-services.service';

describe('TouristServicesService', () => {
  let service: TouristServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristServicesService],
    }).compile();

    service = module.get<TouristServicesService>(TouristServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
