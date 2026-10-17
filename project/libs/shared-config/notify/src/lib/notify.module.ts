import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import rabbitConfig from './rabbit.config';
import mongoConfig from './mongo.config';
import mailConfig from './mail.config';

const ENV_FILE_PATH  = 'apps/notification/notification.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, rabbitConfig, mongoConfig, mailConfig],
      envFilePath:ENV_FILE_PATH, 
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class NotifyConfigModule {}
