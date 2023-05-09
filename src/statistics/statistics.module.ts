import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StatisticsDao } from './statistics.dao';
import { PrismaService } from '../prisma.service';
import { PlaylistModule } from '../playlist/playlist.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [PlaylistModule, TrackModule],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsDao, PrismaService],
})
export class StatisticsModule {}
