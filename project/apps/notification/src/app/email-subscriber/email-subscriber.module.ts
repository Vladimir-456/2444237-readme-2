import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailSubscriberModel, EmailSubscriberSchema } from "./email-subscriber.model";
import { EmailSubscriberService } from "./email-subscriber.service";
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { getRabbitOptions } from "@project/notify";
import { MailModule } from "../mail/mail.module";
import { EmailSubscriberController } from "./email-subscriber.controller";

@Module({
    imports: [
        RabbitMQModule.forRootAsync(getRabbitOptions('rabbit')),
        MongooseModule.forFeature([
            {name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
        ]),
        MailModule
    ],
    controllers: [
        EmailSubscriberController
    ],
    providers: [
        EmailSubscriberService,
        EmailSubscriberRepository,
  ]
})
export class EmailSubscriberModule {}