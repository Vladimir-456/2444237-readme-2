import { Controller } from "@nestjs/common";
import { EmailSubscriberDto } from "./dto/email-subscriber.dto";
import { EmailSubscriberService } from "./email-subscriber.service";
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/notify'
import { MailService } from "../mail/mail.service";
import { NotifyPostPublishedDto } from "./dto/post-published.dto";
@Controller()
export class EmailSubscriberController {
    constructor(
        private readonly emailSubscriberService: EmailSubscriberService,
        private readonly mailService: MailService
    ) {}
    @RabbitSubscribe({
        exchange: 'readme.notification',
        routingKey: RabbitRouting.AddSubscriber,
        queue: 'readme.notification.income'
    })
    async addSubscribe(subscriber: EmailSubscriberDto) {
        this.emailSubscriberService.addSubscriber(subscriber)
        this.mailService.sendNotifyNewSubscriber(subscriber)
    }


    @RabbitSubscribe({
        exchange: 'readme.notification',
        routingKey: RabbitRouting.NotifyPostPublished,
        queue: 'readme.notification.post-published',
    })
    async handleNotifyPostPublished(dto: NotifyPostPublishedDto) {
        console.log('Message:', dto);
        console.log('email:', dto.postId);
        console.log('name:', dto.title);
        const subscribers = await this.emailSubscriberService.findByAuthorId(dto.authorId)
        console.log(subscribers)

        await this.mailService.sendNotifyPostPublished({
            postId: dto.postId,
            title: dto.title,
            authorId: dto.authorId,
            authorEmail: dto.authorEmail,
        }, subscribers)
    }
}