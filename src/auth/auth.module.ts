import { Module } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '../api/config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: {
          expiresIn: `${configService.JWT_EXPIRATION_TIME}s`,
        },
      }),
    }),
  ],
  providers: [LocalStrategy, AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
