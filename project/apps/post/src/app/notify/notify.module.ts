import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { rabbitConfig } from '@project/shared-config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {getRabbitOptions} from '@project/notify'
import { NotifyService } from "./notify.service";

@Module({
    imports: [ConfigModule.forFeature(rabbitConfig),
        RabbitMQModule.forRootAsync(getRabbitOptions('rabbit'))
    ],
    providers: [NotifyService],
    exports: [NotifyService],
})
export class NotifyModule {}