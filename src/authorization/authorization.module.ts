import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationDao } from './authorization.dao';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import * as SuperTokensConfig from '../auth/supertokens/supertokens.config';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: SuperTokensConfig.connectionUri,
      apiKey: SuperTokensConfig.apiKey,
      appInfo: SuperTokensConfig.appInfo,
    }),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationDao, PrismaService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
