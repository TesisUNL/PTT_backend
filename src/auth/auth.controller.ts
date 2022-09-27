import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../api/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Post('register')
  create(@Body() authData: CreateUserDto) {
    return this.authService.register(authData);
  }

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  logIn(@Body() authLoginData: LoginAuthDto, @Request() req) {
    return this.authService.login(authLoginData);
  }
}
