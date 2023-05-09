import { TrackInfoDto } from '../track/dto/track.info.dto';
import { PlaylistInfoDto } from './dto/playlist.info.dto';
import { playlist } from '@prisma/client';
import { PlaylistCreateDto } from './dto/playlist.create.dto';

export class PlaylistTransformer {
  static playlistToPlaylistInfoDto(
    playlist: playlist,
    tracks: TrackInfoDto[],
  ): PlaylistInfoDto {
    return new PlaylistInfoDto(
      playlist.playlistId,
      playlist.playlistName,
      playlist.playlistType,
      playlist.created.toString(),
      playlist.authorId,
      playlist.cover,
      tracks,
    );
  }

  static fieldsToPlaylistCreateDto(fields, cover): PlaylistCreateDto {
    return new PlaylistCreateDto(
      fields.name,
      fields.authorId,
      cover,
      fields.type,
      fields.trackIds.toString().split(','),
    );
  }
}
