import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Canton } from '../cantons/entities/canton.entity';
import { AttractionsService } from './attractions.service';
import { Attraction } from './entities/attraction.entity';
import { FilesService } from '../files/files.service';
import { ConfigService } from '../config/config.service';

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

describe('AttractionsService', () => {
  let service: AttractionsService;

  const attracionModelMock = new ModelMock<Attraction>();
  const cantonModelMock = new ModelMock<Canton>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttractionsService,
        ConfigService,
        FilesService,
        {
          provide: getRepositoryToken(Attraction),
          useValue: attracionModelMock,
        },
        {
          provide: getRepositoryToken(Canton),
          useValue: cantonModelMock,
        },
      ],
    }).compile();

    service = module.get<AttractionsService>(AttractionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
