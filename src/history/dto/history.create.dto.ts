import { ApiProperty } from '@nestjs/swagger';

export class HistoryCreateDto {
  @ApiProperty()
  private readonly userId: number;

  @ApiProperty()
  private readonly trackId: number;

  @ApiProperty()
  private readonly playlistId: number;

  constructor(userId: number, trackId: number, playlistId: number) {
    this.userId = userId;
    this.trackId = trackId;
    this.playlistId = playlistId;
  }
  get getUserId(): number {
    return this.userId;
  }

  get getTrackId(): number {
    return this.trackId;
  }

  get getPlaylistId(): number {
    return this.playlistId;
  }
}
