import { Module } from "@nestjs/common";
import { MailModule } from "../mail/mail.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MailingDelivery, MailingDeliverySchema } from "./schemas/mailing-delivery.model";
import { MailingPost, MailingPostSchema } from "./schemas/mailing-post.model";
import { MailingUserService } from "./mailing-user.service";
import { MailingService } from "./mailing.service";
import { MailingUsers, MailingUsersSchema } from "./schemas/mailing-users.model";
import { MailingWorker } from "./mailing.worker";
import { getRabbitOptions } from "@project/notify";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Module({
    imports: [
        RabbitMQModule.forRootAsync(getRabbitOptions('rabbit')),
        MongooseModule.forFeature([
            {name: MailingDelivery.name, schema: MailingDeliverySchema},
            {name: MailingPost.name, schema: MailingPostSchema},
            {name: MailingUsers.name, schema: MailingUsersSchema}
        ]),
        MailModule
    ],
    providers: [
        MailingService,
        MailingUserService,
        MailingWorker
    ],
    exports: [
        MailingService,
        MailingUserService
    ]
})
export class MailingModule {}