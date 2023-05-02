import { ApiProperty } from '@nestjs/swagger';

export class StatisticsUpdateDto {
  @ApiProperty()
  private readonly num: number;

  @ApiProperty()
  private readonly month: number;

  constructor(num: number, month: number) {
    this.num = num;
    this.month = month;
  }

  get getNum(): number {
    return this.num;
  }

  get getMonth(): number {
    return this.month;
  }
}
