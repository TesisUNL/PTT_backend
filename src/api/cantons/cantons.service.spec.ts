import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CantonsService } from './cantons.service';
import { Canton } from './entities/canton.entity';

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
describe('CantonsService', () => {
  let service: CantonsService;

  const cantonModelMock = new ModelMock<Canton>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CantonsService,
        {
          provide: getRepositoryToken(Canton),
          useValue: cantonModelMock,
        },
      ],
    }).compile();

    service = module.get<CantonsService>(CantonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
