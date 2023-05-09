import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { history } from '@prisma/client';

@Injectable()
export class HistoryDao {
  constructor(private prisma: PrismaService) {}

  async getHistoryByTrackId(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[] | null> {
    return this.prisma.history.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        trackId: parseInt(String(id)),
        date: {
          gte: since,
        },
      },
    });
  }

  async getHistoryByUserId(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[] | null> {
    return this.prisma.history.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        userId: parseInt(String(id)),
        date: {
          gte: since,
        },
      },
    });
  }

  async getHistoryByPlaylistId(
    id: number,
    limit: number,
    offset: number,
    since: Date,
  ): Promise<history[] | null> {
    return this.prisma.history.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        playlistId: parseInt(String(id)),
        date: {
          gte: since,
        },
      },
    });
  }

  async createHistory(
    userId: number,
    trackId: number,
    playlistId: number,
  ): Promise<history> {
    return this.prisma.history.create({
      data: {
        userId: parseInt(String(userId)),
        trackId: parseInt(String(trackId)),
        playlistId: parseInt(String(playlistId)),
      },
    });
  }
}
