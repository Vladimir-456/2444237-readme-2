import { InjectModel } from "@nestjs/mongoose";
import { MailingDelivery, MailingDeliveryDocument } from "./schemas/mailing-delivery.model";
import { MailingPost, MailingPostDocument } from "./schemas/mailing-post.model";
import { Model } from "mongoose";
import { MailService } from "../mail/mail.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class MailingWorker {
    constructor (
        @InjectModel(MailingPost.name)
        private readonly mailingPostModel: Model<MailingPostDocument>,
        @InjectModel(MailingDelivery.name)
        private readonly mailingDeliveryModel: Model<MailingDeliveryDocument>,
        private readonly mailService : MailService
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async processPendingDeliveries(): Promise<void> {
        try {
        const deliveries = await this.mailingDeliveryModel.find({
            status: 'pending',
            })
            .limit(50);
        for (const delivery of deliveries) {
            await this.processDelivery(delivery);
        }
        }
        catch (error: unknown) {
            console.log(error)
        }
    }

    async processDelivery (delivery: MailingDeliveryDocument,) {
        try {
            const posts = await this.mailingPostModel.find({
                mailingId: delivery.mailingId
            })

            await this.mailService.sendPostMailing(
                {
                    email: delivery.email,
                    name: delivery.email,
                    authorId: delivery.userId
                },
                delivery.mailingId,
                posts.map((post) => ({
                    postId: post.postId,
                    title: post.title,
                    description: post.description,
                    imageUrl: post.imageUrl,
                    url: post.url ?? `https://your-app.ru/posts/${post.postId}`,
                    publishDate: post.publishDate.toISOString(),
                }))

            )

            await this.mailingDeliveryModel.updateOne(
                {_id: delivery._id},
                {
                    $set: {
                        status: 'sent',
                        sentAt: new Date(),
                        lastError: null
                    }
                }
            )

        }
        catch (error: unknown) {
            await this.handleDeliveryError(delivery, error)
        }
    }

    private async handleDeliveryError ( delivery: MailingDeliveryDocument, error: unknown) {
        const attempts = delivery.attempts + 1;
        const isFinalFailure = attempts >= 5;
        const delayMs = Math.min(2 ** attempts * 30_000, 30 * 60_000)

        await this.mailingDeliveryModel.updateOne(
            {_id: delivery._id},
            {
                $set: {
                    status: isFinalFailure ? 'failed' : 'pending',
                    attempts,
                    lastError: error,
                    nextAttemptAt: new Date(Date.now() + delayMs),
                }
            }
        )
    }
}