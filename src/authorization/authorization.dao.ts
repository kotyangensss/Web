import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { creds } from '@prisma/client';

@Injectable()
export class AuthorizationDao {
  constructor(private prisma: PrismaService) {}

  async create(id: number, login: string, password: string): Promise<creds> {
    return this.prisma.creds.create({
      data: {
        userId: parseInt(String(id)),
        login: login,
        password: password,
      },
    });
  }

  async check(id: string): Promise<number> {
    const user = await this.prisma.creds
      .findFirst({
        where: {
          password: id,
        },
      })
      .then();
    if (user == null) {
      return undefined;
    }
    return user.userId;
  }

  async delete(login: string): Promise<creds> {
    return this.prisma.creds.delete({
      where: {
        login: login,
      },
    });
  }

  async update(old: string, login: string, password: string): Promise<creds> {
    return this.prisma.creds.update({
      where: {
        login: old,
      },

      data: {
        login: login,
        password: password,
      },
    });
  }
}
