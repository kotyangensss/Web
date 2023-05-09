import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { charts, playlist, track } from '@prisma/client';
import { PlaylistCreateDto } from './dto/playlist.create.dto';

@Injectable()
export class PlaylistDao {
  constructor(private prisma: PrismaService) {}

  async getPlaylist(id: number): Promise<playlist | null> {
    return this.prisma.playlist.findUnique({
      where: {
        playlistId: parseInt(String(id)),
      },
    });
  }

  async getAlbumsByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<playlist[] | null> {
    return this.prisma.playlist.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        playlistType: 'album',
        playlistName: { contains: name },
      },
    });
  }

  async getTracksByPlaylist(id: number): Promise<track[]> {
    const trackToPlaylists = await this.prisma.trackToPlaylist
      .findMany({
        where: {
          playlistId: parseInt(String(id)),
        },
      })
      .then();

    const trackIds = [];
    trackToPlaylists.forEach((ttp) => {
      trackIds.push(ttp.trackId);
    });

    return this.prisma.track.findMany({
      where: {
        trackId: { in: trackIds },
      },
    });
  }

  async getChart(genre: string, period: string): Promise<charts | null> {
    return this.prisma.charts.findFirst({
      where: {
        genre: genre,
        period: period,
      },
    });
  }

  async createPlaylist(playlist: PlaylistCreateDto): Promise<playlist> {
    const created = await this.prisma.playlist.create({
      data: {
        playlistType: playlist.getType,
        authorId: parseInt(String(playlist.getAuthorId)),
        cover: playlist.getCover,
        playlistName: playlist.getName,
      },
    });
    let index = 1;
    for (const tr of playlist.getTrackIds) {
      const track = await this.prisma.trackToPlaylist.create({
        data: {
          playlistId: created.playlistId,
          trackId: parseInt(String(tr)),
          index: index++,
        },
      });
    }

    return created;
  }

  async addTrackToPlaylist(playlistId: number, trackId: number) {
    const tracks = await this.getTracksByPlaylist(playlistId).then();
    const track = await this.prisma.trackToPlaylist.create({
      data: {
        playlistId: parseInt(String(playlistId)),
        trackId: parseInt(String(trackId)),
        index: tracks.length + 1,
      },
    });
  }

  async deleteTrackFromPlaylist(playlistId: number, trackId: number) {
    const track = await this.prisma.trackToPlaylist.deleteMany({
      where: {
        playlistId: parseInt(String(playlistId)),
        trackId: parseInt(String(trackId)),
      },
    });
  }

  async updatePlaylist(
    id: number,
    playlist: PlaylistCreateDto,
  ): Promise<playlist> {
    const created = await this.prisma.playlist.update({
      where: {
        playlistId: id,
      },
      data: {
        cover: playlist.getCover,
        playlistName: playlist.getName,
      },
    });
    if (playlist.getTrackIds.length != 0) {
      await this.prisma.trackToPlaylist.deleteMany({
        where: {
          playlistId: id,
        },
      });

      let index = 1;
      for (const tr of playlist.getTrackIds) {
        const track = await this.prisma.trackToPlaylist.create({
          data: {
            playlistId: created.playlistId,
            trackId: parseInt(String(tr)),
            index: index++,
          },
        });
      }
    }
    return created;
  }

  async deletePlaylist(id: number) {
    await this.prisma.trackToPlaylist.deleteMany({
      where: {
        playlistId: parseInt(String(id)),
      },
    });

    await this.prisma.playlist.delete({
      where: {
        playlistId: parseInt(String(id)),
      },
    });
  }
}
