import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TrackInfoDto } from '../track/dto/track.info.dto';
import { TrackTransformer } from '../track/track.transformer';
import { TrackDao } from '../track/track.dao';
import { PlaylistDao } from './playlist.dao';
import { PlaylistInfoDto } from './dto/playlist.info.dto';
import { PlaylistTransformer } from './playlist.transformer';
import { Genre } from '../track/genre';
import { dropbox } from '../dropbox';
import { UserTransformer } from '../user/user.transformer';

@Injectable()
export class PlaylistService {
  private readonly playlistDao: PlaylistDao;
  private readonly defaultCover =
    'https://dl.dropbox.com/s/zn4jhe31de3454j/xdd.png?dl=0';
  constructor(playlistDao: PlaylistDao) {
    this.playlistDao = playlistDao;
  }
  async getPlaylist(id: number): Promise<PlaylistInfoDto> {
    const playlist = await this.playlistDao.getPlaylist(id).then();
    if (playlist != null) {
      const trackDtos = await this.extractTracksById(id).then();
      return PlaylistTransformer.playlistToPlaylistInfoDto(playlist, trackDtos);
    } else {
      throw new NotFoundException('Плейлист не найден');
    }
  }

  async getAlbumsByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<PlaylistInfoDto[]> {
    const playlists = await this.playlistDao
      .getAlbumsByName(name, limit, offset)
      .then();
    const ans = [];
    for (const pl of playlists) {
      ans.push(pl, this.extractTracksById(pl.playlistId));
    }

    return ans;
  }

  async getChart(genre: Genre, period: string): Promise<PlaylistInfoDto> {
    try {
      const chart = await this.playlistDao.getChart(genre, period).then();
      return this.getPlaylist(chart.playlistId);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async createPlaylist(fields, files): Promise<PlaylistInfoDto> {
    if (fields.name == null || fields.type == null) {
      throw new BadRequestException('не указаны название или тип');
    }

    let cover = await dropbox.newUpload(Folder.cover, files.cover).then();
    if (cover == undefined) {
      cover = this.defaultCover;
    }

    const playlist = PlaylistTransformer.fieldsToPlaylistCreateDto(
      fields,
      cover,
    );
    try {
      const created = await this.playlistDao.createPlaylist(playlist).then();
      if (created != null) {
        return PlaylistTransformer.playlistToPlaylistInfoDto(created, []);
      } else {
        throw new InternalServerErrorException(
          'не получилось создать плейлист',
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addTrackToPlaylist(playlistId: number, trackId: number) {
    try {
      await this.playlistDao.addTrackToPlaylist(playlistId, trackId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async deleteTrackFromPlaylist(playlistId: number, trackId: number) {
    try {
      await this.playlistDao.deleteTrackFromPlaylist(playlistId, trackId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async updatePlaylist(id: number, fields, files): Promise<PlaylistInfoDto> {
    let cover = await dropbox.newUpload(Folder.cover, files.cover).then();
    if (cover == undefined) {
      cover = this.defaultCover;
    }

    const playlist = PlaylistTransformer.fieldsToPlaylistCreateDto(
      fields,
      cover,
    );
    try {
      const created = await this.playlistDao
        .updatePlaylist(fields.id, playlist)
        .then();
      if (created != null) {
        return PlaylistTransformer.playlistToPlaylistInfoDto(created, []);
      } else {
        throw new InternalServerErrorException(
          'не получилось обновить плейлист',
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deletePlaylist(id: number) {
    try {
      await this.playlistDao.deletePlaylist(id).then();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  private async extractTracksById(id): Promise<TrackInfoDto[]> {
    const tracks = await this.playlistDao.getTracksByPlaylist(id).then();
    const trackDtos = [];
    tracks.forEach((track) =>
      trackDtos.push(TrackTransformer.trackToTrackInfoDto(track)),
    );
    return trackDtos;
  }
}
