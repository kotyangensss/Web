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
  private readonly lastMonthNum: number;

  constructor(
    id: number,
    playlistId: number,
    trackId: number,
    num: number,
    lastMonthNum: number,
  ) {
    this.id = id;
    this.playlistId = playlistId;
    this.trackId = trackId;
    this.num = num;
    this.lastMonthNum = lastMonthNum;
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

  get getLastMonthNum(): number {
    return this.lastMonthNum;
  }
}
