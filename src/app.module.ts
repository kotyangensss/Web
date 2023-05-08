import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { PlaylistModule } from './playlist/playlist.module';
import { HistoryModule } from './history/history.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaService } from './prisma.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as SuperTokensConfig from './auth/supertokens/supertokens.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRoot({
      connectionURI: SuperTokensConfig.connectionUri,
      apiKey: SuperTokensConfig.apiKey,
      appInfo: SuperTokensConfig.appInfo,
    }),
    UserModule,
    TrackModule,
    PlaylistModule,
    HistoryModule,
    StatisticsModule,
    AuthorizationModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
