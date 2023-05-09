import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistInfoDto } from './dto/playlist.info.dto';
import { Genre } from '../enums/genre';
import { form } from '../main';
import { PlaylistCreateDto } from './dto/playlist.create.dto';
import { PlaylistUpdatePlaylistDto } from './dto/playlist.update.playlist.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  private readonly playlistService: PlaylistService;
  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService;
  }

  @ApiOperation({
    summary: 'Получить чарты',
  })
  @ApiResponse({
    status: 200,
    description: 'Чарты найдены',
  })
  @ApiResponse({
    status: 400,
    description: 'Неправильный ввод',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get('charts')
  async getCharts(
    @Param('genre') genre?: Genre,
    @Param('period') period?: string,
  ): Promise<PlaylistInfoDto> {
    return await this.playlistService.getChart(genre, period);
  }

  @ApiOperation({
    summary: 'Получить всю информацию о плейлисте по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист найден',
  })
  @ApiResponse({
    status: 400,
    description: 'Неправильный ввод',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get(':id')
  async getPlaylist(@Param('id') id: number): Promise<PlaylistInfoDto> {
    return await this.playlistService.getPlaylist(id);
  }

  @ApiOperation({
    summary: 'Получить список плейлистов',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлисты найдены',
  })
  @Get('/search/:name')
  async getPlaylists(
    @Param('name') name: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<PlaylistInfoDto[]> {
    return await this.playlistService.getAlbumsByName(name, limit, offset);
  }

  @ApiOperation({
    summary: 'Удалить Плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист удален',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Delete('/delete/:id')
  @UseGuards(new AuthGuard())
  async deletePlaylist(@Param('id') id: number) {
    await this.playlistService.deletePlaylist(id);
  }

  @ApiOperation({
    summary: 'Создать Плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Плохой запрос',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @Post('playlist/create')
  @ApiConsumes('multipart/form-data')
  @UseGuards(new AuthGuard())
  async createAlbum(
    @Req() req,
    @Body() playlist: PlaylistCreateDto,
  ): Promise<PlaylistInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.playlistService.createPlaylist(formFields[0], formFields[1]);
  }

  @ApiOperation({
    summary: 'Обновить плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'плейлист обновлен',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Альбом не найден',
  })
  @Put('playlist/update/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(new AuthGuard())
  async updateAlbum(
    @Req() req,
    @Param('id') id: number,
    @Body() playlist: PlaylistUpdatePlaylistDto,
  ): Promise<PlaylistInfoDto> {
    const formFields = await new Promise(function (resolve) {
      form.parse(req, (err, fields, files) => {
        resolve([fields, files]);
      });
    });

    return this.playlistService.updatePlaylist(
      id,
      formFields[0],
      formFields[1],
    );
  }

  @ApiOperation({
    summary: 'Удалить трек из плейлиста',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек удален из плейлиста',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Delete(':playlistId')
  @UseGuards(new AuthGuard())
  async deleteTrackFromPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    await this.playlistService.deleteTrackFromPlaylist(playlistId, trackId);
  }

  @ApiOperation({
    summary: 'Добвить трек в плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек добавлен в плейлист',
  })
  @ApiResponse({
    status: 401,
    description: 'Неавторизованный',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Post(':playlistId')
  @UseGuards(new AuthGuard())
  async addTrackToPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    await this.playlistService.addTrackToPlaylist(playlistId, trackId);
  }
}

//TODO: добавить всякие 403 400 ошибки, явно указывать тип во всех массивах
