import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackDao } from './track.dao';
import { PrismaService } from '../prisma.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [TrackController],
  providers: [TrackService, TrackDao, PrismaService],
  exports: [TrackService],
})
export class TrackModule {}
