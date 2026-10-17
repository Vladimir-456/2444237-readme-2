import { plainToClass } from "class-transformer";
import { ConfigType, registerAs } from "@nestjs/config";
import { RabbitConfig } from "./rabbit/rabbit";

interface RabbitConfigInterface {
    host: string;
    password: string;
    port : number;
    user: string;
    queue: string;
    exchange: string;
}

async function getRabbitConfig () : Promise<RabbitConfigInterface> {
    const config = plainToClass(RabbitConfig, {
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