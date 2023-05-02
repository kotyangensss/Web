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
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistInfoDto } from './dto/playlist.info.dto';
import { PlaylistCreateAlbumDto } from './dto/playlist.create.album.dto';
import { PlaylistUpdateAlbumDto } from './dto/playlist.update.album.dto';
import { PlaylistCreatePlaylistDto } from './dto/playlist.create.playlist.dto';
import { PlaylistUpdatePlaylistDto } from './dto/playlist.update.playlist.dto';
import { PlaylistCreateSingleDto } from './dto/playlist.create.single.dto';

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
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get('charts')
  async getCharts(@Param('id') id: number): Promise<PlaylistInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить всю информацию о плейлисте по id',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист найден',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get(':id')
  async getPlaylist(@Param('id') id: number): Promise<PlaylistInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить список плейлистов',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлисты найдены',
  })
  @Get(':name')
  async getPlaylists(@Param('name') name: string): Promise<PlaylistInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить Плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Delete(':id')
  async deletePlaylist(@Param('id') id: number): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Создать Альбом',
  })
  @ApiResponse({
    status: 200,
    description: 'Альбом создан',
  })
  @Post('album')
  @ApiConsumes('multipart/form-data')
  async createAlbum(@Body() track: PlaylistCreateAlbumDto): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Обновить альбом',
  })
  @ApiResponse({
    status: 200,
    description: 'Альбом обновлен',
  })
  @ApiResponse({
    status: 404,
    description: 'Альбом не найден',
  })
  @Put('album/:id')
  @ApiConsumes('multipart/form-data')
  async updateAlbum(
    @Param('album/id') id: number,
    @Body() track: PlaylistUpdateAlbumDto,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Создать юзерский плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист создан',
  })
  @Post('user')
  @ApiConsumes('multipart/form-data')
  async createUserPlaylist(
    @Body() track: PlaylistCreatePlaylistDto,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Обновить юзерский плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Плейлист обновлен',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлст не найден',
  })
  @Put('user/:id')
  @ApiConsumes('multipart/form-data')
  async updateUserPlaylist(
    @Param('id') id: number,
    @Body() track: PlaylistUpdatePlaylistDto,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Создать сингл',
  })
  @ApiResponse({
    status: 200,
    description: 'Сингл создан',
  })
  @Post('single')
  @ApiConsumes('multipart/form-data')
  async createSingle(@Body() track: PlaylistCreateSingleDto): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить трек из плейлиста',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек удален из плейлиста',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Delete(':playlistId')
  async deleteTrackFromPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ): Promise<number> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Добвить трек в плейлист',
  })
  @ApiResponse({
    status: 200,
    description: 'Трек добавлен в плейлист',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Post(':playlistId')
  async addTrackToPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ): Promise<number> {
    throw new NotImplementedException();
  }
}

//TODO: сделать formdata унифицированной, добавить всякие 403 400 ошибки, явно указывать тип во всех массивах,
// можно еще индексы навесить и в статистике хранить просто месяц а не ластмесяц
