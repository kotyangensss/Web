import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackInfoDto } from './dto/track.info.dto';
import { TrackCreateDto } from './dto/track.create.dto';
import { TrackUpdateDto } from './dto/track.update.dto';
import { form } from '../main';
import { Genre } from '../enums/genre';
import { AuthGuard } from '../auth/auth/auth.guard';
@ApiBearerAuth()
@ApiTags('track')
@Controller('track')
export class TrackController {
  private readonly trackService: TrackService;
  constructor(trackService: TrackService) {
    this.trackService = trackService;
  }

  @ApiOperation({
    summary: 'Получить последние релизы',
  })
  @ApiResponse({
    status: 200,
    description: 'Треки найдены',
  })
  @Get('releases')
  async getLatestTracks(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<TrackInfoDto[]> {
    return await this.trackService.getLatestTracks(limit, offset);
  }

  @ApiOperation({
    summary: 'Получить всю информацию о треке по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек найден',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get(':id')
  @Render('track')
  async getTrack(@Param('id', ParseIntPipe) id: number) {
    return await this.trackService.getTrack(id).then();
  }

  @ApiOperation({
    summary: 'Получить список треков по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Треки найдены',
  })
  @Get('/search/:name')
  async getTracks(
    @Param('name') name: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<TrackInfoDto[]> {
    return await this.trackService.getTracksByName(name, limit, offset);
  }

  @ApiOperation({
    summary: 'Получить список треков по жанру',
  })
  @ApiResponse({
    status: 200,
    description: 'Треки найдены',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @Get('/genres/:genre')
  async getTrackByGenre(
    @Param('genre') name: Genre,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<TrackInfoDto[]> {
    if (!Object.values(Genre).includes(name)) {
      throw new BadRequestException();
    }
    return await this.trackService.getTracksByGenre(name, limit, offset);
  }

  @ApiOperation({
    summary: 'Добавить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Неправильный ввод',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseGuards(new AuthGuard())
  async createTrack(
    @Req() req,
    @Body() track: TrackCreateDto,
  ): Promise<TrackInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.trackService.createTrack(formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Обновить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек обновлен',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Put('/update/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(new AuthGuard())
  async updateTrack(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() track?: TrackUpdateDto,
  ): Promise<TrackInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.trackService.updateTrack(id, formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Удалить трек',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек удален',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Delete('/delete/:id')
  @UseGuards(new AuthGuard())
  async deleteTrack(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TrackInfoDto> {
    return this.trackService.deleteTrack(id);
  }
}
