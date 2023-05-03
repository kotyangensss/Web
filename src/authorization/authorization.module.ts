import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationDao } from './authorization.dao';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationDao, PrismaService],
})
export class AuthorizationModule {}
