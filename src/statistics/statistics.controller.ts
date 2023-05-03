import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { statistics } from '@prisma/client';
import { StatisticsService } from './statistics.service';
import { PlaylistInfoDto } from '../playlist/dto/playlist.info.dto';
import { TrackInfoDto } from '../track/dto/track.info.dto';

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  private readonly statisticsService: StatisticsService;
  constructor(statisticsService: StatisticsService) {
    this.statisticsService = statisticsService;
  }
  @ApiOperation({
    summary: 'Получить полную статистику по треку',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Трек не найден',
  })
  @Get('track/:id')
  async getFullStatisticsForTrack(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<statistics[]> {
    return this.statisticsService.getTrackStat(id, limit, offset);
  }

  @ApiOperation({
    summary: 'Получить полную статистику по плейлисту',
  })
  @ApiResponse({
    status: 200,
    description: 'Статистика найдена',
  })
  @ApiResponse({
    status: 404,
    description: 'Плейлист не найден',
  })
  @Get('playlist/:id')
  async getFullStatisticsForPlaylist(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<statistics[]> {
    return this.statisticsService.getPlaylistStat(id, limit, offset);
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
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    // @Param('genres') genres: Genre[],
  ): Promise<TrackInfoDto[]> {
    return this.statisticsService.getTopTracks(limit, offset, true);
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
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    // @Param('genres') types: PlaylistType[],
  ): Promise<PlaylistInfoDto[]> {
    return this.statisticsService.getTopPlaylists(limit, offset, true);
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
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    // @Param('genres') genres: Genre[],
  ): Promise<TrackInfoDto[]> {
    return this.statisticsService.getTopTracks(limit, offset, false);
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
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    // @Param('types') types: PlaylistType[],
  ): Promise<PlaylistInfoDto[]> {
    return this.statisticsService.getTopPlaylists(limit, offset, false);
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
  @Post('/create/:id')
  @ApiConsumes('multipart/form-data')
  async addStatistics(
    @Param('id') id: number,
    @Query('type') type: string,
    @Query('date') date: Date,
  ): Promise<statistics> {
    return this.statisticsService.addStat(id, type, new Date(date));
  }
}
