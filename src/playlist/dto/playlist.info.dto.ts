import { ApiProperty } from '@nestjs/swagger';
import { PlaylistType } from '../playlist.type';
import { TrackInfoDto } from '../../track/dto/track.info.dto';

export class PlaylistInfoDto {
  @ApiProperty()
  private readonly id: number;

  @ApiProperty()
  private readonly name: string;

  @ApiProperty({ enum: PlaylistType })
  private readonly type: PlaylistType;

  @ApiProperty()
  private readonly created: string;

  @ApiProperty()
  private readonly authorId: number;

  @ApiProperty()
  private readonly cover: string;

  @ApiProperty()
  private readonly tracks: TrackInfoDto[];

  constructor(
    id: number,
    name: string,
    type: PlaylistType,
    created: string,
    authorId: number,
    cover: string,
    tracks: TrackInfoDto[],
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.created = created;
    this.authorId = authorId;
    this.cover = cover;
    this.tracks = tracks;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getType(): PlaylistType {
    return this.type;
  }

  get getCreated(): string {
    return this.created;
  }

  get getAuthorId(): number {
    return this.authorId;
  }

  get getCover(): string {
    return this.cover;
  }

  get getTracks(): TrackInfoDto[] {
    return this.tracks;
  }
}
