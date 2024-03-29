import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth/auth.filter';

export const client = new PrismaClient();
export const formidable = require('formidable');
export const form = formidable({ multiples: true, uploadDir: __dirname });

// This is a function, don't forget to call it:
client.$use(fieldEncryptionMiddleware());
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });

  const hbs = await require('hbs');
  const express = await require('express');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'partials'));

  const config = new DocumentBuilder()
    .setTitle('starege-music API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [process.env.HOST],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  const port = process.env.PORT || '3000';
  await app.listen(port);
}
bootstrap();
