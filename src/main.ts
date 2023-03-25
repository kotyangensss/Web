import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const client = new PrismaClient();

// This is a function, don't forget to call it:
client.$use(fieldEncryptionMiddleware());
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const hbs = await require('hbs');

  const config = new DocumentBuilder()
    .setTitle('starege-music API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'partials'));

  const port = process.env.PORT || '3000';
  await app.listen(port);
}
bootstrap();
