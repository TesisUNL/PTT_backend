import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() authData: CreateUserDto) {
    return this.authService.register(authData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  logIn(@Body() authLoginData: LoginAuthDto, @Request() req) {
    return req.user;
  }
}
