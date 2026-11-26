import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { AppExceptionFilter } from './app/filters/app-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AxiosExceptionFilter } from './app/filters/axios-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const config = new DocumentBuilder()
  .setTitle('API Gateway')
  .setDescription('API')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'JWT access token',
  },
  'access-token'
  )
  .build()

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor)
  app.useGlobalFilters(new AxiosExceptionFilter(), new AppExceptionFilter())

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('spec', app, document)

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
