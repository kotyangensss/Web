import { ApiProperty } from '@nestjs/swagger';
import { TrackInfoDto } from '../../track/dto/track.info.dto';
import { PlaylistType } from '../playlist.type';

export class PlaylistCreateAlbumDto {
  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly cover: string;
  private readonly type: PlaylistType;

  @ApiProperty()
  private readonly tracks: TrackInfoDto[];

  constructor(
    name: string,
    cover: string,
    type: PlaylistType.ALBUM,
    tracks: TrackInfoDto[],
  ) {
    this.name = name;
    this.cover = cover;
    this.type = type;
    this.tracks = tracks;
  }

  get getName(): string {
    return this.name;
  }

  get getCover(): string {
    return this.cover;
  }

  get getType(): PlaylistType {
    return this.type;
  }

  get getTracks(): TrackInfoDto[] {
    return this.tracks;
  }
}
