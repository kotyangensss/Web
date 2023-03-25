import { UserType } from '../user.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  private readonly email: string;

  @ApiProperty()
  private readonly name: string;

  @ApiProperty({ enum: UserType })
  private readonly type: UserType;

  constructor(email: string, name: string, type: UserType) {
    this.email = email;
    this.name = name;
    this.type = type;
  }
  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  get getType(): UserType {
    return this.type;
  }
}
