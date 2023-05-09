import { ApiProperty } from '@nestjs/swagger';

export class StatisticsInfoDto {
  @ApiProperty()
  private readonly id: number;

  @ApiProperty()
  private readonly playlistId: number;

  @ApiProperty()
  private readonly trackId: number;

  @ApiProperty()
  private readonly num: number;

  @ApiProperty()
  private readonly month: number;

  constructor(
    id: number,
    playlistId: number,
    trackId: number,
    num: number,
    month: number,
  ) {
    this.id = id;
    this.playlistId = playlistId;
    this.trackId = trackId;
    this.num = num;
    this.month = month;
  }

  get getId(): number {
    return this.id;
  }
  get getTrackId(): number {
    return this.trackId;
  }

  get getPlaylistId(): number {
    return this.playlistId;
  }

  get getNum(): number {
    return this.num;
  }

  get getMonth(): number {
    return this.month;
  }
}
