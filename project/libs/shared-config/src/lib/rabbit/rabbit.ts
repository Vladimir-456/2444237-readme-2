import { IsNumber, IsString, validateOrReject } from "class-validator";
import { RabbitConnectionConfig, RabbitMessageConfig } from "./rabbit.config.interface";

const DEFAULT_RABBIT_PORT = 5672

export class RabbitConfig implements RabbitConnectionConfig, RabbitMessageConfig {
    @IsString()
    host: string;
    @IsString()
    password: string;
    @IsNumber()
    port : number = DEFAULT_RABBIT_PORT;
    @IsString()
    user: string;
    @IsString()
    queue: string;
    @IsString()
    exchange: string;

    public async validate() {
        await validateOrReject(this)
    }
}