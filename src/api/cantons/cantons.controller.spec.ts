import { Test, TestingModule } from '@nestjs/testing';
import { CantonsController } from './cantons.controller';
import { CantonsService } from './cantons.service';

describe('CantonsController', () => {
  let controller: CantonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CantonsController],
      providers: [CantonsService],
    }).compile();

    controller = module.get<CantonsController>(CantonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
