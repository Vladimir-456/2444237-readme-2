import { Module } from "@nestjs/common";
import { NotifyService } from "./notify.service";
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {getRabbitOptions} from '@project/notify'
import { ConfigModule } from "@nestjs/config";
import { rabbitConfig } from '@project/shared-config'

@Module({
    imports: [
        ConfigModule.forFeature(rabbitConfig),
        RabbitMQModule.forRootAsync(getRabbitOptions('rabbit'))
    ],
    providers: [NotifyService],
    exports: [NotifyService]
})
export class NotifyModule {}