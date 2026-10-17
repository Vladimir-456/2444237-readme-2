import { plainToClass } from "class-transformer";
import { MailConfig } from "./mail/mail";
import { ConfigType, registerAs } from "@nestjs/config";

async function getMailConfig() {
    const config = plainToClass(MailConfig, {
        host: process.env['MAILER_HOST'],
        port: Number(process.env['MAILER_PORT']),
        from: process.env['MAILER_FROM'],
    })

    await config.validate()

    return config
}

export default registerAs(
  'mail',
  async (): Promise<ConfigType<typeof getMailConfig>> => {
    return getMailConfig();
  },
);
