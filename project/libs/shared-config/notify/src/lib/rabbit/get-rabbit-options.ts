import { ConfigService } from "@nestjs/config";
import { getRabbitMQConnectionString } from "./get-rabbit-connection";

export function getRabbitOptions (optionSpace : string) {
    return {
        useFactory: async (config: ConfigService) => ({
            exchanges: [
            {
                name: config.getOrThrow<string>(`${optionSpace}.exchange`),
                type: 'direct'
            }
            ],
            
            uri: getRabbitMQConnectionString({
                host: config.getOrThrow<string>(`${optionSpace}.host`),
                password: config.getOrThrow<string>(`${optionSpace}.password`),
                user: config.getOrThrow<string>(`${optionSpace}.user`),
                port: config.getOrThrow<number>(`${optionSpace}.port`),
            }),

            connectionInitOptions: { wait: true },
            enableControllerDiscovery: true,
        }),
        inject: [ConfigService]
    }
}