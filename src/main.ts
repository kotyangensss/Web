import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = process.env.PORT;
  if (port === undefined) {
    port = '3000';
  }
  await app.listen(port);
}
bootstrap();
