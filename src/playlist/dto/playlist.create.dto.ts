import { ApiProperty } from '@nestjs/swagger';
import { PlaylistType } from '../playlist.type';

export class PlaylistCreateDto {
  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly authorId: number;

  @ApiProperty({ format: 'binary', required: false })
  private readonly cover: string;

  @ApiProperty({ enum: PlaylistType })
  private readonly type: PlaylistType;

  @ApiProperty()
  private readonly trackIds: number[];

  constructor(
    name: string,
    authorId: number,
    cover: string,
    type: PlaylistType,
    trackIds: number[],
  ) {
    this.name = name;
    this.authorId = authorId;
    this.cover = cover;
    this.type = type;
    this.trackIds = trackIds;
  }

  get getName(): string {
    return this.name;
  }

  get getAuthorId(): number {
    return this.authorId;
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
