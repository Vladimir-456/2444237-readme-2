import { Inject, Injectable } from "@nestjs/common";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { rabbitConfig } from '@project/shared-config'
import { ConfigType } from "@nestjs/config";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { RabbitRouting } from "@project/notify";

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
}