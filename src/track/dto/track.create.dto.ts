import { Genre } from '../genre';
import { ApiProperty } from '@nestjs/swagger';

export class TrackCreateDto {
  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly id: number;

  @ApiProperty({ required: false })
  private readonly featIds: number[];

  @ApiProperty({ required: false })
  private readonly featNames: string[];

  @ApiProperty({ format: 'binary', required: false })
  private readonly cover: string;

  @ApiProperty({ format: 'binary' })
  private readonly source: string;

  @ApiProperty({ required: false })
  private readonly length: number;

  @ApiProperty({ enum: Genre, isArray: true })
  private readonly genres: Genre[];

  @ApiProperty({ format: 'binary', required: false })
  private readonly lyrics: string;

  constructor(
    name: string,
    id: number,
    featIds: number[],
    featNames: string[],
    cover: string,
    source: string,
    length: number,
    genres: Genre[],
    lyrics: string,
  ) {
    this.name = name;
    this.id = id;
    this.featIds = featIds;
    this.featNames = featNames;
    this.cover = cover;
    this.source = source;
    this.length = length;
    this.genres = genres;
    this.lyrics = lyrics;
  }

  get getName(): string {
    return this.name;
  }

  get getId(): number {
    return this.id;
  }

  get getFeatIds(): number[] {
    return this.featIds;
  }

  get getFeatNames(): string[] {
    return this.featNames;
  }

  get getCover(): string {
    return this.cover;
  }

  get getSource(): string {
    return this.source;
  }
  get getLength(): number {
    return this.length;
  }

  get getGenres(): Genre[] {
    return this.genres;
  }

  get getLyrics(): string {
    return this.lyrics;
  }
}
