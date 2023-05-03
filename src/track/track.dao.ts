import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { track } from '@prisma/client';
import { TrackCreateDto } from './dto/track.create.dto';

@Injectable()
export class TrackDao {
  constructor(private prisma: PrismaService) {}
  async getTrack(id: number): Promise<track | null> {
    return this.prisma.track.findUnique({
      where: {
        trackId: parseInt(String(id)),
      },
    });
  }

  async getTracksByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<track[]> {
    return this.prisma.track.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        trackName: { contains: name },
      },
    });
  }

  async createTrack(track: TrackCreateDto): Promise<track> {
    return this.prisma.track.create({
      data: {
        trackName: track.getName,
        authorId: parseInt(String(track.getId)),
        featIds: track.getFeatIds,
        featNames: track.getFeatNames,
        cover: track.getCover,
        source: track.getSource,
        length: parseInt(String(track.getLength)),
        lyrics: track.getLyrics,
        genres: track.getGenres,
      },
    });
  }

  async updateTrack(id: number, track: TrackCreateDto): Promise<track> {
    return this.prisma.track.update({
      where: {
        trackId: parseInt(String(id)),
      },
      data: {
        trackName: track.getName,
        featIds: track.getFeatIds,
        featNames: track.getFeatNames,
        cover: track.getCover,
        source: track.getSource,
        length:
          track.getLength == undefined
            ? undefined
            : parseInt(String(track.getLength)),
        lyrics: track.getLyrics,
        genres: track.getGenres,
      },
    });
  }

  async deleteTrack(id: number): Promise<track> {
    return this.prisma.track.delete({
      where: {
        trackId: parseInt(String(id)),
      },
    });
  }
}
