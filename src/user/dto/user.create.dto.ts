import { UserType } from '../user.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  private readonly email: string;

  @ApiProperty()
  private readonly name: string;

  @ApiProperty({ required: false })
  private readonly bio: string;

  @ApiProperty({ enum: UserType })
  private readonly type: UserType;

  @ApiProperty({ format: 'binary', required: false })
  private readonly profilePic: string;

  constructor(
    email: string,
    name: string,
    bio: string,
    type: UserType,
    profilePic: string,
  ) {
    this.email = email;
    this.name = name;
    this.bio = bio;
    this.type = type;
    this.profilePic = profilePic;
  }
  get getName(): string {
    return this.name;
  }

  get getBio(): string {
    return this.bio;
  }

  get getEmail(): string {
    return this.email;
  }

  get getType(): UserType {
    return this.type;
  }

  get getProfilePic(): string {
    return this.profilePic;
  }
}
