import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { DatabaseTypeOrmError } from '../api/utils';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async register(authData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(authData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...authData,
        password: hashedPassword,
      });

      delete createdUser?.password;

      return createdUser;
    } catch (error) {
      if (
        error?.code &&
        error.code === DatabaseTypeOrmError?.UniqueConstraintError
      ) {
        throw new BadRequestException(
          `User with email:${authData.email} already exists`,
        );
      }

      throw new BadRequestException('Something went wrong', error.code);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user?.password);
      delete user?.password;

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
