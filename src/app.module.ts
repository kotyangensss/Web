import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { PlaylistModule } from './playlist/playlist.module';
import { HistoryModule } from './history/history.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    PlaylistModule,
    HistoryModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
