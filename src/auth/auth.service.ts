import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { DatabaseTypeOrmError } from '../api/utils';
import { JwtService } from '@nestjs/jwt';
import { User } from '../api/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { mapUser } from '../api/users/users.utils';
import { MailService } from '../api/mail/mail.service';
import { ConfigService } from '../api/config/config.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  public async register(authData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(authData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...authData,
        password: hashedPassword,
      });

      return mapUser(createdUser);
    } catch (error) {
      if (error?.code && error.code === DatabaseTypeOrmError?.UniqueConstraintError) {
        throw new BadRequestException(`User with email:${authData.email} already exists`);
      }

      throw new BadRequestException('Something went wrong', error.code);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const filters = { email };
      const user = await this.usersService.findOne({ filters });

      if (!user) {
        throw new NotFoundException(`User with ${email} does not exist`);
      }

      await this.verifyPassword(plainTextPassword, user?.password);

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async login(userRequest: LoginAuthDto) {
    const filters = { email: userRequest.email };
    const user: User = await this.usersService.findOne({ filters });

    const payload = {
      email: user?.email,
      sub: user?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      //  refresh_token: await this.generateRefreshToken(recordUser.id),
      user: mapUser(user),
    };
  }

  async forgotPassword(email: string) {
    const filters = { email };
    const user: User = await this.usersService.findOne({ filters });
    if (!user) {
      throw new NotFoundException(`User with ${email} does not exist`);
    }
    const payload = { email: user.email, name: user.name };
    const token = this.jwtService.sign(payload, { expiresIn: '12h' });

    const url = `${this.configService.FRONTEND_URI}/reset-password?token=${token}`;
    return await this.mailService.sendEmail(
      email,
      'Reset your password',
      `Please click the following link to reset your password: ${url}`,
    );
  }

  async resetPassword(token: string, password: string) {
    try {
      if (!password) {
        throw new BadRequestException('Please provide new password');
      }
      const payload = this.jwtService.verify(token);
      const email = payload.email;
      const user: User = await this.usersService.findOne({ filters: { email } });
      if (!user.isActive) {
        throw new BadRequestException(`The user with the email ${email} is not active`);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return mapUser(await this.usersService.update(user.id, { password: hashedPassword }));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException('The token expired');
      }

      throw new BadRequestException('Something went wrong', error.code);
    }
  }
}
