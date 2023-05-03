import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StatisticsDao } from './statistics.dao';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsDao, PrismaService],
})
export class StatisticsModule {}
