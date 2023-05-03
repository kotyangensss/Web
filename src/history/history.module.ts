import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryDao } from './history.dao';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryDao, PrismaService],
})
export class HistoryModule {}
