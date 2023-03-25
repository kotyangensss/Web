import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorizationCreateDto } from './dto/authorization.create.dto';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller('authorization')
export class AuthorizationController {
  @ApiOperation({
    summary: 'Добавить логин и пароль',
  })
  @ApiResponse({
    status: 200,
    description: 'Авторизация добавлена',
  })
  @Post('')
  async createCred(@Body() cred: AuthorizationCreateDto): Promise<number> {
    throw new NotImplementedException();
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
  @Delete(':login')
  async deleteCred(@Param('login') login: string): Promise<number> {
    throw new NotImplementedException();
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
  @Put(':login')
  async updateCred(
    @Param('login') login: string,
    @Param('newLogin') newLogin: string,
    @Param('newPassword') newPassword: string,
  ): Promise<number> {
    throw new NotImplementedException();
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
  async checkPassword(@Param('password') password: string): Promise<boolean> {
    throw new NotImplementedException();
  }
}
