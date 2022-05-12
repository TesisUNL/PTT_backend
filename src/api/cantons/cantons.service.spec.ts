import { Test, TestingModule } from '@nestjs/testing';
import { CantonsService } from './cantons.service';

describe('CantonsService', () => {
  let service: CantonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CantonsService],
    }).compile();

    service = module.get<CantonsService>(CantonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
