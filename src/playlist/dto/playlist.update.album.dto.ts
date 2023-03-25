import { ApiProperty } from '@nestjs/swagger';
import { TrackInfoDto } from '../../track/dto/track.info.dto';

export class PlaylistUpdateAlbumDto {
  @ApiProperty({ required: false })
  private readonly name: string;

  @ApiProperty({ required: false })
  private readonly cover: string;

  @ApiProperty({ required: false })
  private readonly tracks: TrackInfoDto[];

  constructor(name: string, cover: string, tracks: TrackInfoDto[]) {
    this.name = name;
    this.cover = cover;
    this.tracks = tracks;
  }

  get getName(): string {
    return this.name;
  }

  get getCover(): string {
    return this.cover;
  }

  get getTracks(): TrackInfoDto[] {
    return this.tracks;
  }
}
