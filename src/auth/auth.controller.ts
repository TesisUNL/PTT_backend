import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ResetNewPasswordDto, ResetPasswordDto } from '../api/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBearerAuth()
  @Post('register')
  create(@Body() authData: CreateUserDto) {
    return this.authService.register(authData);
  }

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  logIn(@Body() authLoginData: LoginAuthDto) {
    return this.authService.login(authLoginData);
  }

  @Public()
  @Post('forgotPassword')
  forgotPassword(@Body() { email }: ResetPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() { password }: ResetNewPasswordDto) {
    return await this.authService.resetPassword(token, password);
  }
}
