import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerAsyncOptions(optionSpace: string) : MailerAsyncOptions {
    return {
        useFactory: async (config: ConfigService) => {
            return {
                transport: {
                    host: config.getOrThrow<string>(`${optionSpace}.host`),
                    port: config.getOrThrow<string>(`${optionSpace}.port`),
                    secure:false,
    
                },
                defaults: {
                    from: config.getOrThrow<string>(`${optionSpace}.from`)
                },
                template: {
                    dir: resolve(__dirname, 'assets'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            }
        },
        inject: [ConfigService]
    }
}