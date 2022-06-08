import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../api/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );

    if (!user) {
      throw new ForbiddenException('Invalid username or password');
    }
    return user;
  }
}
