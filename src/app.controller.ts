import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('test')
  // @Render('index')
  // root(): { message: string } {
  //   return { message: 'Hello world Test!' };
  // }
}
