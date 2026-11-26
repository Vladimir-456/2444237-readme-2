import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { NotifyConfigModule } from '../../../../libs/shared-config/notify/src/lib/notify.module';
import { getMongooseOptions } from '@project/notify';
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
