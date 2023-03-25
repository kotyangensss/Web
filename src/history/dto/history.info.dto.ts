import { ApiProperty } from '@nestjs/swagger';

export class HistoryInfoDto {
  @ApiProperty()
  private readonly id: number;

  @ApiProperty()
  private readonly userId: number;

  @ApiProperty()
  private readonly trackId: number;

  @ApiProperty()
  private readonly playlistId: number;

  @ApiProperty()
  private readonly date: string;

  constructor(
    id: number,
    userId: number,
    trackId: number,
    playlistId: number,
    date: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.trackId = trackId;
    this.playlistId = playlistId;
    this.date = date;
  }

  get getId(): number {
    return this.id;
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

  get getDate(): string {
    return this.date;
  }
}
