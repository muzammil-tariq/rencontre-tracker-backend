import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DEFAULT_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '5gb' });
  app.useBodyParser('urlencoded', { limit: '5gb' });

  const configService = app.get(ConfigService);

  const corsArray = configService.get('FRONTEND_URL').split(',');

  app.enableCors({
    origin: corsArray,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const config = new DocumentBuilder()
    .setTitle('Legacy Suite API')
    .addBearerAuth()
    .setDescription('The api backend for legacy suite')
    .setVersion('1.0')
    .addTag('legacy-suite')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
}
bootstrap();
