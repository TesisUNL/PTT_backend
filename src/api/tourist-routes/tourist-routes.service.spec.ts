import { Test, TestingModule } from '@nestjs/testing';
import { TouristRoutesService } from './tourist-routes.service';

describe('TouristRoutesService', () => {
  let service: TouristRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristRoutesService],
    }).compile();

    service = module.get<TouristRoutesService>(TouristRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
