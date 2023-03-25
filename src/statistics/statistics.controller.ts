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
} from '@nestjs/common';
import { StatisticsInfoDto } from './dto/statistics.info.dto';
import { StatisticsUpdateDto } from './dto/statistics.update.dto';
import { Genre } from '../track/genre';
import { PlaylistType } from '../playlist/playlist.type';

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  @ApiOperation({
    summary: 'Получить полную статистику по треку',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @Get('track/:id')
  async getFullStatisticsForTrack(
    @Param('id') id: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): Promise<StatisticsInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить полную статистику по плейлисту',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @Get('playlist/:id')
  async getFullStatisticsForPlaylist(
    @Param('id') id: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): Promise<StatisticsInfoDto[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить самые популярные треки за прошлый месяц',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get('top-tracks-last-month')
  async getMostPopularTracksLastMonth(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('genres') genres: Genre[],
  ): Promise<number[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить самые популярные плейлисты за прошлый месяц',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get('top-playlists-last-month')
  async getMostPopularPlaylistsLastMonth(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('genres') types: PlaylistType[],
  ): Promise<number[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить самые популярные треки',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get('top-tracks')
  async getMostPopularTracks(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('genres') genres: Genre[],
  ): Promise<number[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Получить самые популярные плейлисты',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get('top-playlists')
  async getMostPopularPlaylists(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('types') types: PlaylistType[],
  ): Promise<number[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Добавить статистику',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика добавлена',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Post(':trackId')
  async addStatistics(
    @Param('trackId') trackId: number,
    @Param('playlistId') playlistId: number,
  ): Promise<StatisticsInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Обновить статистику',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика обновлена',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист или трек не найден',
  })
  @Post(':id')
  async updateStatistics(
    @Param('id') id: number,
    @Body() statistics: StatisticsUpdateDto,
  ): Promise<StatisticsInfoDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Удалить статистику по треку',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика удалена',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Delete(':trackId')
  async deleteStatistics(
    @Param('trackId') trackId: number,
  ): Promise<StatisticsInfoDto[]> {
    throw new NotImplementedException();
  }
}
