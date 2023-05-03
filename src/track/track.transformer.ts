import { TrackInfoDto } from './dto/track.info.dto';
import { track } from '@prisma/client';
import { TrackCreateDto } from './dto/track.create.dto';

export class TrackTransformer {
  static trackToTrackInfoDto(track: track): TrackInfoDto {
    return new TrackInfoDto(
      track.trackId,
      track.trackName,
      track.authorId,
      track.featIds,
      track.featNames,
      track.cover,
      track.source,
      track.created.toString(),
      track.length,
      track.genres,
      track.lyrics,
    );
  }

  static fieldsToTrackCreateDto(fields, cover, source, lyrics, length) {
    return new TrackCreateDto(
      fields.name,
      fields.id,
      fields.featIds,
      fields.featNames,
      cover,
      source,
      length,
      fields.genres,
      lyrics,
    );
  }
}
