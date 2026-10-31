import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { RabbitRouting } from "@project/notify";
import { rabbitConfig } from "@project/shared-config";
import { NotifyPostPublishedDto } from "./dto/notify.post.published.dto";
import { NotifyNewPostsDto } from "./dto/notify.posts.published.dto";
import { PostMailingCreatedDto } from "./dto/post-mailing.dto";

@Injectable()
export class NotifyService {
    constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
    ) {}

    async notifyPostPublished (dto: NotifyPostPublishedDto) {
        await this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.NotifyPostPublished,
            {...dto}
        )
    }

    async notifyPostMailingCreated (dto: PostMailingCreatedDto) {
        await this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.PostMailingCreated,
            {...dto},
            {
                persistent: true,
                contentType: 'application/json',
            },
        )
    }

    async notifyNewPosts (dto: NotifyNewPostsDto) {
        await this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.NotifyNewPostsPublished,
            {...dto},
            {
                persistent: true,
                contentType: 'application/json',
            }
        )
    }
}