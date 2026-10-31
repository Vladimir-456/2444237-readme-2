import { Inject, Injectable } from "@nestjs/common";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { rabbitConfig } from '@project/shared-config'
import { ConfigType } from "@nestjs/config";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { RabbitRouting } from "@project/notify";
import { CurrentUserPayload } from "@project/core";
import { UserCreatedDto } from "@project/shared-types";

@Injectable()
export class NotifyService {
    constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}
    async registerSubscriber (dto: CreateSubscriberDto) {
        this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.AddSubscriber,
            {...dto}
        )
    }

    async registerNewUser (dto: UserCreatedDto) {
        this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.UserCreated,
            {...dto}
        )
    }

    async requestNotifyLetter (user: CurrentUserPayload) {
        this.rabbitClient.publish(
            this.rabbitOptions.exchange,
            RabbitRouting.NotifyLetterRequested,
            {
                userId: user.id,
                eventId: crypto.randomUUID(),
                requestedAt: new Date().toISOString()
            }
        )
    }
}