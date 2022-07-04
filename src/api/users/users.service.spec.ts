import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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
    return {
      id: 'f2b3aff3-bbb6-4de3-b5fb-c1519b7e4c28',
      role: 'GSOC Operator',
      email: 'user100@gmail.com',
      name: 'User 100',
      tenant_id: 'fe9c735b-67f3-11eb-a4c6-0e75692c197b',
    };
  }
}

describe('UsersService', () => {
  let service: UsersService;

  const userModelMock = new ModelMock<User>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
