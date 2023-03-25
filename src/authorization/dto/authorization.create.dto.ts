import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationCreateDto {
  @ApiProperty()
  private readonly login: string;

  @ApiProperty()
  private readonly password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  get getLogin(): string {
    return this.login;
  }

  get getPassword(): string {
    return this.password;
  }
}
