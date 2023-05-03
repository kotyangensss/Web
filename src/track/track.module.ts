import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackDao } from './track.dao';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService, TrackDao, PrismaService],
})
export class TrackModule {}
