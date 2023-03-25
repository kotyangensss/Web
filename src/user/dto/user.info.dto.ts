import { ApiProperty } from '@nestjs/swagger';

export class UserinfoDto {
  @ApiProperty()
  private readonly id: number;

  @ApiProperty()
  private readonly email: string;

  @ApiProperty()
  private readonly name: string;

  @ApiProperty()
  private readonly bio: string;

  @ApiProperty()
  private readonly type: string;

  @ApiProperty()
  private readonly profilePic: string;

  @ApiProperty()
  private readonly created: string;

  constructor(
    id: number,
    email: string,
    name: string,
    bio: string,
    type: string,
    profilePic: string,
    created: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.bio = bio;
    this.type = type;
    this.profilePic = profilePic;
    this.created = created;
  }

  get getId(): number {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  get getBio(): string {
    return this.bio;
  }

  get getType(): string {
    return this.type;
  }
  get getProfilePic(): string {
    return this.profilePic;
  }

  get getCreated(): string {
    return this.created;
  }
}
