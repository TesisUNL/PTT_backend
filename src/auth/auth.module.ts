import { Module } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
