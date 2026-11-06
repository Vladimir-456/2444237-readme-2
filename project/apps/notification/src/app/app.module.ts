import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions, NotifyConfigModule } from '@project/notify';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { ScheduleModule } from '@nestjs/schedule'


@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
