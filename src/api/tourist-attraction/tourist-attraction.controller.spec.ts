import { Test, TestingModule } from '@nestjs/testing';
import { TouristAttractionController } from './tourist-attraction.controller';
import { TouristAttractionService } from './tourist-attraction.service';

describe('TouristAttractionController', () => {
  let controller: TouristAttractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristAttractionController],
      providers: [TouristAttractionService],
    }).compile();

    controller = module.get<TouristAttractionController>(
      TouristAttractionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
