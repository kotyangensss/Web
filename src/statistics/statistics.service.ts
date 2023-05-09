import { Injectable, NotFoundException } from '@nestjs/common';
import { StatisticsDao } from './statistics.dao';
import { statistics } from '@prisma/client';
import { PlaylistInfoDto } from '../playlist/dto/playlist.info.dto';
import { PlaylistService } from '../playlist/playlist.service';
import { TrackInfoDto } from '../track/dto/track.info.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class StatisticsService {
  private readonly statisticsDao: StatisticsDao;
  private readonly playlistService: PlaylistService;
  private readonly trackService: TrackService;

  constructor(
    statisticsDao: StatisticsDao,
    playlistService: PlaylistService,
    trackService: TrackService,
  ) {
    this.statisticsDao = statisticsDao;
    this.playlistService = playlistService;
    this.trackService = trackService;
  }

  async getTrackStat(
    id: number,
    limit: number,
    offset: number,
  ): Promise<statistics[]> {
    try {
      return this.statisticsDao.getTrackStat(id, limit, offset);
    } catch (e) {
      throw new NotFoundException('трек не найден');
    }
  }

  async getPlaylistStat(
    id: number,
    limit: number,
    offset: number,
  ): Promise<statistics[]> {
    try {
      return this.statisticsDao.getPlaylistStat(id, limit, offset);
    } catch (e) {
      throw new NotFoundException('плейлист не найден');
    }
  }

  async addStat(id: number, type: string, date: Date): Promise<statistics> {
    try {
      return this.statisticsDao.addStat(
        id,
        type,
        await this.statisticsDao.findNum(id, type, date),
        this.dateToStatMonth(date),
      );
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async getTopPlaylists(
    limit: number,
    offset: number,
    isLastMonth: boolean,
  ): Promise<PlaylistInfoDto[]> {
    const pls = await this.statisticsDao
      .getTopPlaylists(
        this.dateToStatMonth(new Date(Date.now())),
        limit,
        offset,
        isLastMonth,
      )
      .then();
    const ans = [];
    for (const pl of pls) {
      ans.push(await this.playlistService.getPlaylist(parseInt(pl.playlistId)));
    }
    return ans;
  }

  async getTopTracks(
    limit: number,
    offset: number,
    isLastMonth: boolean,
  ): Promise<TrackInfoDto[]> {
    const pls = await this.statisticsDao
      .getTopTracks(
        this.dateToStatMonth(new Date(Date.now())),
        limit,
        offset,
        isLastMonth,
      )
      .then();
    const ans = [];
    for (const pl of pls) {
      ans.push(await this.trackService.getTrack(parseInt(pl.trackId)));
    }
    return ans;
  }

  private dateToStatMonth(date: Date): number {
    return date.getFullYear() * 100 + date.getMonth() + 1;
  }
}
