import { Controller } from "@nestjs/common";
import { EmailSubscriberDto } from "./dto/email-subscriber.dto";
import { EmailSubscriberService } from "./email-subscriber.service";
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/notify'
import { MailService } from "../mail/mail.service";
import { NotifyPostPublishedDto } from "./dto/post-published.dto";
import { UserCreatedDto } from "../mailing/dto/created-user";
import { MailingUserService } from "../mailing/mailing-user.service";
import { MailingService } from "../mailing/mailing.service";
import { PostMailingCreatedDto } from "../mailing/dto/post-mailing.dto";
import { EXCHANGE_RABBIT } from "./email-subscriber.constants";
@Controller()
export class EmailSubscriberController {
    constructor(
        private readonly emailSubscriberService: EmailSubscriberService,
        private readonly mailService: MailService,
        private readonly mailingUserService: MailingUserService,
        private readonly mailingService: MailingService,
    ) {}
    @RabbitSubscribe({
        exchange: EXCHANGE_RABBIT,
        routingKey: RabbitRouting.AddSubscriber,
        queue: 'readme.notification.income'
    })
    async addSubscribe(subscriber: EmailSubscriberDto) {
        await this.emailSubscriberService.addSubscriber(subscriber)
        await this.mailService.sendNotifyNewSubscriber(subscriber)
    }

    @RabbitSubscribe({
        exchange: EXCHANGE_RABBIT,
        routingKey: RabbitRouting.PostMailingCreated,
        queue: 'notifications.post-mailing-created',
        queueOptions: {
            durable: true
        }
    })
    async handlePostMailingCreated (dto: PostMailingCreatedDto) {
        await this.mailingService.createDeliveries(dto)
    }

    @RabbitSubscribe({
        exchange: EXCHANGE_RABBIT,
        routingKey: RabbitRouting.UserCreated,
        queue: 'notifications.users-created',
    })
    async handleUserCreated(payload: UserCreatedDto) {
        await this.mailingUserService.createUser({
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
            isActive: true,
        });
  }

    // @RabbitSubscribe({
    //     exchange: EXCHANGE_RABBIT,
    //     routingKey: RabbitRouting.NotifyPostPublished,
    //     queue: 'readme.notification.post-published',
    // })
    // async handleNotifyPostPublished(dto: NotifyPostPublishedDto) {
    //     const subscribers = await this.emailSubscriberService.findByAuthorId(dto.authorId)

    //     await this.mailService.sendNotifyPostPublished({
    //         postId: dto.postId,
    //         title: dto.title,
    //         authorId: dto.authorId,
    //         authorEmail: dto.authorEmail,
    //     }, subscribers)
    // }
}