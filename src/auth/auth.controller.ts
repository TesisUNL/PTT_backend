import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() authData: CreateUserDto) {
    return this.authService.register(authData);
  }
}
