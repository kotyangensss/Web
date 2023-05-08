import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Render,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthorizationController {
  private readonly authorizationService: AuthorizationService;
  constructor(authorizationService: AuthorizationService) {
    this.authorizationService = authorizationService;
  }

  @ApiOperation({
    summary: 'Via google',
  })
  @Get('callback/google')
  @Render('auth')
  async authByGoogle() {
    // http://localhost:3000/auth/callback/google?code=4%2F0AbUR2VP5XEO3_tW0wNjpW2xiWjfbWZesCuGCwOFBE5JccTovZg1Nrwux7GYtx2Sm_rzvcw
    // &scope=email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid
    // &authuser=0
    // &prompt=none
  }

  @ApiOperation({
    summary: 'Добавить логин и пароль',
  })
  @ApiResponse({
    status: 200,
    description: 'Авторизация добавлена',
  })
  @Post('/create')
  async createCred(
    @Query('id') id: number,
    @Query('login') login: string,
    @Query('password') password: string,
  ): Promise<string> {
    return this.authorizationService.create(id, login, password);
  }

  @ApiOperation({
    summary: 'Удалить логин и пароль',
  })
  @ApiResponse({
    status: 200,
    description: 'Авторизация удалена',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Delete('/delete/:login')
  async deleteCred(@Param('login') login: string): Promise<string> {
    return this.authorizationService.delete(login);
  }

  @ApiOperation({
    summary: 'Обновить логин и пароль',
  })
  @ApiResponse({
    status: 200,
    description: 'Авторизация обновлена',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Put('/update/:login')
  async updateCred(
    @Param('login') login: string,
    @Query('newLogin') newLogin: string,
    @Query('newPassword') newPassword: string,
  ): Promise<string> {
    return this.authorizationService.update(login, newLogin, newPassword);
  }

  @ApiOperation({
    summary: 'Проверить auth id',
  })
  @ApiResponse({
    status: 200,
    description: 'Авторизация найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Get('check')
  async checkPassword(@Query('id') id: string): Promise<number> {
    return this.authorizationService.check(id);
  }
}
