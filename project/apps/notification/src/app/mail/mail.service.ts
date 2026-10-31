import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailConfig } from '@project/notify';
import { MailingPost, PostPublished, Subscriber } from '@project/shared-types';

export const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Подписка на рассылку оформлена';

export const EMAIL_POST_MAILING_SUBJECT = 'Новые публикации'

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    @Inject(MailConfig.KEY)
    private readonly notifyConfig: ConfigType<typeof MailConfig>

    async sendNotifyNewSubscriber(subscriber: Subscriber) {
        await this.mailerService.sendMail({
            from: this.notifyConfig.from,
            to: subscriber.email,
            subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
            template: './add-subscriber',
            context: {
                user: `${subscriber.name}`,
                email: `${subscriber.email}`,
        }
    })
    }

    async sendPostMailing (subscriber: Subscriber,mailingId: string, posts: MailingPost[]) {
        await this.mailerService.sendMail({
            from: this.notifyConfig.from,
            to: subscriber.email,
            subject: EMAIL_POST_MAILING_SUBJECT,
            template: './post-mailing',
            context: {
                user: subscriber.name,
                mailingId: mailingId,
                posts: posts
            }
        })
    }

    // async sendNotifyPostPublished(
    //     post: PostPublished,
    //     subscribers: Subscriber[],
    //     ): Promise<void> {
    //     await Promise.all(
    //         subscribers.map((subscriber) =>
    //         this.mailerService.sendMail({
    //             from: this.notifyConfig.from,
    //             to: subscriber.email,
    //             subject: 'Новая публикация автора',
    //             template: './post-published',
    //             context: {
    //                 user: subscriber.name,
    //                 subscriberEmail: subscriber.email,
    //                 authorEmail: post.authorEmail,
    //                 postTitle: post.title,
    //             },
    //         }),
    //         ),
    //     );
    //     }
}