import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HistoryDao } from './history.dao';
import { history } from '@prisma/client';

@Injectable()
export class HistoryService {
  private readonly historyDao: HistoryDao;
  constructor(historyDao: HistoryDao) {
    this.historyDao = historyDao;
  }

  async getHistoryByUser(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[]> {
    const histories = await this.historyDao
      .getHistoryByUserId(id, limit, offset, since)
      .then();
    if (histories.length != 0) {
      return histories;
    } else {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async getHistoryByTrack(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[]> {
    const histories = await this.historyDao
      .getHistoryByTrackId(id, limit, offset, since)
      .then();
    if (histories.length != 0) {
      return histories;
    } else {
      throw new NotFoundException('Трек не найден');
    }
  }

  async getHistoryByPlaylist(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[]> {
    const histories = await this.historyDao
      .getHistoryByPlaylistId(id, limit, offset, since)
      .then();
    if (histories.length != 0) {
      return histories;
    } else {
      throw new NotFoundException('Плейлист не найден');
    }
  }

  async createHistory(fields): Promise<history> {
    try {
      return this.historyDao.createHistory(
        fields.userId,
        fields.trackId,
        fields.playlistId,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
