import { ApiProperty } from '@nestjs/swagger';

export class TrackInfoDto {
  @ApiProperty()
  private readonly id: number;

  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly authorId: number;

  @ApiProperty()
  private readonly featIds: number[];

  @ApiProperty()
  private readonly featNames: string[];

  @ApiProperty()
  private readonly cover: string;

  @ApiProperty()
  private readonly source: string;

  @ApiProperty()
  private readonly created: string;

  @ApiProperty()
  private readonly length: number;

  @ApiProperty()
  private readonly genres: string[];

  @ApiProperty()
  private readonly lyrics: string;

  constructor(
    id: number,
    name: string,
    authorId: number,
    featIds: number[],
    featNames: string[],
    cover: string,
    source: string,
    created: string,
    length: number,
    genres: string[],
  ) {
    this.id = id;
    this.name = name;
    this.authorId = authorId;
    this.featIds = featIds;
    this.featNames = featNames;
    this.cover = cover;
    this.source = source;
    this.created = created;
    this.length = length;
    this.genres = genres;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getAuthorId(): number {
    return this.authorId;
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

  get getCreated(): string {
    return this.created;
  }

  get getLength(): number {
    return this.length;
  }

  get getGenres(): string[] {
    return this.genres;
  }
}
