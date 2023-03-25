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
import { UserinfoDto } from './dto/user.info.dto';

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
    status: 404,
    description: 'Пользователь не найден',
  })
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserinfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Добавить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь создан',
  })
  @ApiResponse({
    status: 409,
    description: 'Email уже занят',
  })
  @Post('')
  async createUser(@Body() user: UserCreateDto): Promise<UserinfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Обновить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь обновлен',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  async updateUser(
    @Param('id') id: number,
    @Body() user?: UserUpdateDto,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить список пользователей по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователи найдены',
  })
  @Get(':name')
  async getUsers(@Param('name') name: string): Promise<UserinfoDto[]> {
    throw new NotImplementedException();
  }
}
