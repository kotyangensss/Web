import { ApiProperty } from '@nestjs/swagger';

export class PlaylistUpdatePlaylistDto {
  @ApiProperty({ required: false })
  private readonly name: string;

  @ApiProperty({ required: false })
  private readonly cover: string;

  @ApiProperty({ required: false })
  private readonly trackIds: number[];

  constructor(name: string, cover: string, trackIds: number[]) {
    this.name = name;
    this.cover = cover;
    this.trackIds = trackIds;
  }

  get getName(): string {
    return this.name;
  }

  get getCover(): string {
    return this.cover;
  }

  get getTracks(): number[] {
    return this.trackIds;
  }
}
