import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const configService = app.get(ConfigService);

  const port = configService.get('application.port');

  await app.listen(3200);

  Logger.log(
    `🚀 Application is running on: http://localhost:3200/${globalPrefix}`,
  );
}

bootstrap();
