import { plainToInstance } from "class-transformer";
import { ConfigType, registerAs } from "@nestjs/config";
import { RabbitConfig } from "./rabbit";

async function getRabbitConfig () : Promise<RabbitConfig> {
    const config = plainToInstance(RabbitConfig, {
        host: process.env['RABBIT_HOST'],
        password: process.env['RABBIT_PASSWORD'],
        port : Number(process.env['RABBIT_PORT']),
        user: process.env['RABBIT_USER'],
        queue: process.env['RABBIT_QUEUE'],
        exchange: process.env['RABBIT_EXCHANGE'],
    })

    await config.validate()

    return config
}

export default registerAs(
    'rabbit',
    async () :Promise<ConfigType<typeof getRabbitConfig>> => getRabbitConfig()
)
