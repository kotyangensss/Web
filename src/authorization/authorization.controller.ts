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
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller('authorization')
export class AuthorizationController {
  private readonly authorizationService: AuthorizationService;
  constructor(authorizationService: AuthorizationService) {
    this.authorizationService = authorizationService;
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
    summary: 'Проверить пароль',
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
  async checkPassword(
    @Query('login') login: string,
    @Query('password') password: string,
  ): Promise<boolean> {
    return this.authorizationService.check(login, password);
  }
}
