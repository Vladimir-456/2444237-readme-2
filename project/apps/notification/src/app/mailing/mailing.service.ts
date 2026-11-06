import { AnyBulkWriteOperation, Model } from "mongoose";
import { MailingPost, MailingPostDocument } from "./schemas/mailing-post.model";
import { InjectModel } from "@nestjs/mongoose";
import { MailingDelivery, MailingDeliveryDocument } from "./schemas/mailing-delivery.model";
import { Injectable } from "@nestjs/common";
import { PostMailingCreatedDto } from "./dto/post-mailing.dto";
import { MailingUserService } from "./mailing-user.service";
import { MailingWorker } from "./mailing.worker";

@Injectable()
export class MailingService {
    constructor(
        @InjectModel(MailingPost.name)
        private readonly mailingPostModel: Model<MailingPostDocument>,
        @InjectModel(MailingDelivery.name)
        private readonly mailingDeliveryModel: Model<MailingDeliveryDocument>,
        private readonly mailingUsersService: MailingUserService,
    ) {}

    async createDeliveries (dto: PostMailingCreatedDto) {
        await this.savePosts(dto)
        const users = await this.mailingUsersService.getAllActiveUsers()

        const operations : AnyBulkWriteOperation<MailingDeliveryDocument>[] = users.map((user) => ({
            updateOne: {
            filter: {
                mailingId: dto.mailingId,
                userId: user.userId,
            },
            update: {
                $setOnInsert: {
                mailingId: dto.mailingId,
                userId: user.userId,
                email: user.email,
                status: 'pending',
                attempts: 0,
                },
            },
            upsert: true,
            },
        }));

        await this.mailingDeliveryModel.bulkWrite(operations)

    }

    async savePosts(dto: PostMailingCreatedDto) {
        const operations = dto.posts.map((post, index) => ({
            updateOne: {
                filter: {
                    mailingId: dto.mailingId,
                    postId: post.postId,
                },
                update: {
                    $set: {
                    mailingId: dto.mailingId,
                    postId: post.postId,
                    title: post.title,
                    description: post.description,
                    imageUrl: post.imageUrl,
                    url: post.url,
                    publishDate: new Date(post.publishDate),
                    position: index,
                    },
                },
                upsert: true
            }
        }))

        await this.mailingPostModel.bulkWrite(operations)
    }
}