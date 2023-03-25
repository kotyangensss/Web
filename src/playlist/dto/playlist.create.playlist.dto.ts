import { ApiProperty } from '@nestjs/swagger';
import { PlaylistType } from '../playlist.type';

export class PlaylistCreatePlaylistDto {
  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly cover: string;
  private readonly type: PlaylistType;

  @ApiProperty()
  private readonly trackIds: number[];

  constructor(
    name: string,
    cover: string,
    type: PlaylistType.PLAYLIST,
    trackIds: number[],
  ) {
    this.name = name;
    this.cover = cover;
    this.type = type;
    this.trackIds = trackIds;
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

  get getTrackIds(): number[] {
    return this.trackIds;
  }
}
