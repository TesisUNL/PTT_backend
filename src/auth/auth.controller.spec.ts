import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../api/users/entities/user.entity';
import { UsersService } from '../api/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../api/mail/mail.service';
import { ConfigService } from '../api/config/config.service';

describe('AuthController', () => {
  let controller: AuthController;
  const usersRepository = {
    create: jest.fn().mockResolvedValue({
      /*userDat*/
    }),
    save: jest.fn().mockReturnValue(Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        MailService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
