import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserDao } from './user.dao';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserDao, PrismaService],
})
export class UserModule {}
