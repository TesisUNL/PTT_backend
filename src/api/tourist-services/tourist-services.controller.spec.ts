import { Test, TestingModule } from '@nestjs/testing';
import { TouristServicesController } from './tourist-services.controller';

describe('TouristServicesController', () => {
  let controller: TouristServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristServicesController],
    }).compile();

    controller = module.get<TouristServicesController>(TouristServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
