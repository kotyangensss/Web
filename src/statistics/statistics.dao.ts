import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { statistics } from '@prisma/client';

@Injectable()
export class StatisticsDao {
  constructor(private prisma: PrismaService) {}

  async getTrackStat(
    id: number,
    limit: number,
    offset: number,
  ): Promise<statistics[]> {
    return this.prisma.statistics.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        trackId: parseInt(String(id)),
      },
    });
  }

  async getPlaylistStat(
    id: number,
    limit: number,
    offset: number,
  ): Promise<statistics[]> {
    return this.prisma.statistics.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        playlistId: parseInt(String(id)),
      },
    });
  }

  async addStat(
    id: number,
    type: string,
    num: number,
    date: number,
  ): Promise<statistics> {
    switch (type) {
      case 'track': {
        return this.prisma.statistics.create({
          data: {
            trackId: parseInt(String(id)),
            playlistId: undefined,
            num: parseInt(String(num)),
            month: parseInt(String(date)),
          },
        });
      }
      case 'playlist': {
        return this.prisma.statistics.create({
          data: {
            trackId: undefined,
            playlistId: parseInt(String(id)),
            num: parseInt(String(num)),
            month: parseInt(String(date)),
          },
        });
      }
      default: {
        throw new BadRequestException('неправильный тип');
      }
    }
  }

  async getTopPlaylists(
    date: number,
    limit: number,
    offset: number,
    isLastMonth: boolean,
  ): Promise<any> {
    return this.prisma.statistics.groupBy({
      by: ['playlistId'],
      where: {
        NOT: {
          playlistId: null,
        },
        month: isLastMonth ? parseInt(String(date)) : {},
      },
      _sum: {
        num: true,
      },
      orderBy: {
        _sum: {
          num: 'desc',
        },
      },
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
    });
  }

  async getTopTracks(
    date: number,
    limit: number,
    offset: number,
    isLastMonth: boolean,
  ): Promise<any> {
    return this.prisma.statistics.groupBy({
      by: ['trackId'],
      where: {
        NOT: {
          trackId: null,
        },
        month: isLastMonth ? parseInt(String(date)) : {},
      },
      _sum: {
        num: true,
      },
      orderBy: {
        _sum: {
          num: 'desc',
        },
      },
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
    });
  }

  async findNum(id: number, type: string, since: Date): Promise<number> {
    let hists = [];
    switch (type) {
      case 'track': {
        hists = await this.prisma.history
          .findMany({
            where: {
              trackId: parseInt(String(id)),
              date: {
                gte: since,
              },
            },
          })
          .then();
        break;
      }
      case 'playlist': {
        hists = await this.prisma.history
          .findMany({
            where: {
              playlistId: parseInt(String(id)),
              date: {
                gte: since,
              },
            },
          })
          .then();
        break;
      }
    }

    return hists.length;
  }
}
