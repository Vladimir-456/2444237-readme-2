import { plainToClass } from 'class-transformer';
import { AppConfig } from './app/app';
import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_PORT } from './app/app.constant';

export interface AppConfigInterface {
  port: number;
  environment: string;
}

async function getAppConfig() {
  const config = plainToClass(AppConfig, {
    port: process.env['PORT'] ? parseInt(process.env['PORT']) : DEFAULT_PORT,
    environment: process.env['ENVIRONMENT'] || 'development',
  });

  await config.validate();

  return config;
}

export default registerAs(
  'application',
  async (): Promise<ConfigType<typeof getAppConfig>> => getAppConfig(),
);
