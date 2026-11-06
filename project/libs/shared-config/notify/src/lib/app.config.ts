import {plainToClass, plainToInstance} from 'class-transformer'
import { NotifyAppConfig } from './app/app'
import { ConfigType, registerAs } from '@nestjs/config'

export interface AppConfig {
    environment: string,
    port: string,
}

export async function getAppConfig () : Promise<AppConfig> {
    const config = plainToInstance(NotifyAppConfig, {
        environment: process.env['ENVIRONMENT'],
        port: Number(process.env['PORT'])
    })

    await config.validate()

    return config
}

export default registerAs(
    'app', 
    async (): Promise<ConfigType<typeof getAppConfig>> => getAppConfig()
)