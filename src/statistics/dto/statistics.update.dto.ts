import { ApiProperty } from '@nestjs/swagger';

export class StatisticsUpdateDto {
  @ApiProperty()
  private readonly num: number;

  @ApiProperty()
  private readonly lastMonthNum: number;

  constructor(num: number, lastMonthNum: number) {
    this.num = num;
    this.lastMonthNum = lastMonthNum;
  }

  get getNum(): number {
    return this.num;
  }

  get getLastMonthNum(): number {
    return this.lastMonthNum;
  }
}
