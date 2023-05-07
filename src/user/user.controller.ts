import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserInfoDto } from './dto/userInfoDto';
import { form } from '../main';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  @ApiOperation({
    summary: 'Получить всю информацию о пользователе по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь найден',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserInfoDto> {
    return await this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Добавить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 409,
    description: 'Email уже занят',
  })
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  async createUser(
    @Req() req,
    @Body() user: UserCreateDto,
  ): Promise<UserInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.userService.createUser(formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Обновить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь обновлен',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Put('/update/:id')
  @ApiConsumes('multipart/form-data')
  async updateUser(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() user?: UserUpdateDto,
  ): Promise<UserInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.userService.updateUser(id, formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Удалить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь удален',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserInfoDto> {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({
    summary: 'Получить список пользователей по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователи найдены',
  })
  @Get('/search/:name')
  async getUsers(
    @Param('name') name: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<UserInfoDto[]> {
    return await this.userService.getUsersByName(name, limit, offset);
  }
}
