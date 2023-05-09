import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PlaylistDao } from './playlist.dao';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistDao, PrismaService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
