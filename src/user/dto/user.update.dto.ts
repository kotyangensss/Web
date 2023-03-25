import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  private readonly email: string;

  @ApiProperty({ required: false })
  private readonly name: string;

  @ApiProperty({ required: false })
  private readonly bio: string;

  @ApiProperty({ format: 'binary', required: false })
  private readonly profilePic: string;

  constructor(email: string, name: string, bio: string, profilePic: string) {
    this.email = email;
    this.name = name;
    this.bio = bio;
    this.profilePic = profilePic;
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

  get getProfilePic(): string {
    return this.profilePic;
  }
}
