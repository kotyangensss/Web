import { Injectable } from '@nestjs/common';
import { Genre } from './enums/genre';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UserInfoDto } from './user/dto/userInfoDto';
import { AuthorizationService } from './authorization/authorization.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  private readonly authorizationService: AuthorizationService;
  private readonly userService: UserService;

  constructor(
    authorizationService: AuthorizationService,
    userService: UserService,
  ) {
    this.authorizationService = authorizationService;
    this.userService = userService;
  }
  getHello(): string {
    return 'Hello World!';
  }

  getGenres(): Genre[] {
    return Object.values(Genre);
  }

  async getUser(session: SessionContainer): Promise<UserInfoDto> {
    if (session == undefined) {
      return undefined;
    }
    const authId = session.getUserId();
    const id = await this.authorizationService.check(authId);
    if (id == undefined) {
      return undefined;
    } else {
      return this.userService.getUser(id);
    }
  }
}
