import { Test, TestingModule } from '@nestjs/testing';
import { TouristRoutesController } from './tourist-routes.controller';
import { TouristRoutesService } from './tourist-routes.service';

describe('TouristRoutesController', () => {
  let controller: TouristRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristRoutesController],
      providers: [TouristRoutesService],
    }).compile();

    controller = module.get<TouristRoutesController>(TouristRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
