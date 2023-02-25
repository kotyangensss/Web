import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './loading.interceptor';

@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  isAuthorized() {
    return true;
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: this.isAuthorized() };
  }

  @Get('/playlists')
  @Render('playlists')
  playlists() {
    return { message: this.isAuthorized() };
  }

  @Get('/releases')
  @Render('releases')
  releases() {
    return { message: this.isAuthorized() };
  }

  @Get('/sign')
  @Render('sign')
  sign() {
    return { message: this.isAuthorized() };
  }

  @Get('/genres')
  @Render('genres')
  genres() {
    return { message: this.isAuthorized() };
  }

  @Get('/contacts')
  @Render('contacts')
  contacts() {
    return { message: this.isAuthorized() };
  }

  @Get('/chart')
  @Render('chart')
  chart() {
    return { message: this.isAuthorized() };
  }

  @Get('/profile')
  @Render('profile')
  profile() {
    return { message: this.isAuthorized() };
  }
}
