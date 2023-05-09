import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserDao {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: {
        userId: parseInt(String(id)),
      },
    });
  }

  async getUsersByName(
    name: string,
    limit: number,
    offset: number,
  ): Promise<user[]> {
    return this.prisma.user.findMany({
      skip: parseInt(String(offset)),
      take: parseInt(String(limit)),
      where: {
        name: { contains: name },
      },
    });
  }

  async createUser(user: UserCreateDto): Promise<user> {
    return this.prisma.user.create({
      data: {
        email: user.getEmail,
        name: user.getName,
        user_type: user.getType,
        bio: user.getBio,
        profilePic: user.getProfilePic,
      },
    });
  }

  async updateUser(id: number, user: UserCreateDto): Promise<user> {
    return this.prisma.user.update({
      where: {
        userId: parseInt(String(id)),
      },
      data: {
        email: user.getEmail,
        name: user.getName,
        user_type: user.getType,
        bio: user.getBio,
        profilePic: user.getProfilePic,
      },
    });
  }

  async deleteUser(id: number): Promise<user> {
    return this.prisma.user.delete({
      where: {
        userId: parseInt(String(id)),
      },
    });
  }
}
