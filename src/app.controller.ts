import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './loading.interceptor';

@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  isAuthorized() {
    return false;
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
    return {
      message: this.isAuthorized(),
      genres: [this.appService.getGenres()],
    };
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

  @Get('/user')
  @Render('user')
  user() {
    return { message: this.isAuthorized() };
  }

  @Get('/track')
  @Render('track')
  track() {
    return { message: this.isAuthorized() };
  }

  @Get('/login')
  @Render('login')
  login() {
    return { message: this.isAuthorized() };
  }

  @Get('/about')
  @Render('about')
  about() {
    return { message: this.isAuthorized() };
  }

  @Get('/search')
  @Render('search')
  search() {
    return { message: this.isAuthorized() };
  }
}
