import { Test, TestingModule } from '@nestjs/testing';
import { TouristAttractionService } from './tourist-attraction.service';

describe('TouristAttractionService', () => {
  let service: TouristAttractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristAttractionService],
    }).compile();

    service = module.get<TouristAttractionService>(TouristAttractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
