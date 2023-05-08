import {
  Controller,
  Get,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTimeInterceptor } from './loading.interceptor';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from './auth/session/session.decorator';
import { AuthGuard } from './auth/auth/auth.guard';

@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  isAuthorized() {
    return false;
  }
  constructor(private readonly appService: AppService) {}

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get()
  @Render('index')
  async root(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard())
  @Get('/playlists')
  @Render('playlists')
  async playlists(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/releases')
  @Render('releases')
  async releases(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/auth')
  @Render('auth')
  async auth(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/genres')
  @Render('genres')
  async genres(@Session() session?: SessionContainer) {
    const resp = await this.getSession(session).then();
    return {
      genres: [this.appService.getGenres()],
      message: resp.message,
      pic: resp.pic,
      id: resp.id,
    };
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/contacts')
  @Render('contacts')
  async contacts(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/chart')
  @Render('chart')
  async chart(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/about')
  @Render('about')
  async about(@Session() session?: SessionContainer) {
    return await this.getSession(session).then();
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/signin')
  @Render('signin')
  async signIn() {
    return;
  }

  async getSession(session) {
    const user = await this.appService.getUser(session);
    if (user == undefined) {
      return { message: false };
    } else {
      return { message: true, pic: user.getProfilePic, id: user.getId };
    }
  }
}
