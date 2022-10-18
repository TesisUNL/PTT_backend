import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../api/config/config.service';
import { UsersService } from '../../api/users/users.service';
import { TokenPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService, private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET,
      passReqToCallback: true,
      usernameField: 'email',
    });
  }

  async validate(_req: any, payload: TokenPayload) {
    const user = await this.userService.findOne({ filters: { email: payload.email } });
    return user;
  }
}
