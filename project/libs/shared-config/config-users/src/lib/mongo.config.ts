import { plainToClass } from 'class-transformer';
import { DEFAULT_MONGO_PORT } from './mongodb/mongo.const';
import { MongoConfiguration } from './mongodb/mongo.env';
import { ConfigType, registerAs } from '@nestjs/config';

export interface MongoConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env['MONGO_HOST'],
    port: process.env['MONGO_PORT']
      ? parseInt(process.env['MONGO_PORT'])
      : DEFAULT_MONGO_PORT,
    name: process.env['MONGO_DB'],
    user: process.env['MONGO_USER'],
    password: process.env['MONGO_PASSWORD'],
    authBase: process.env['MONGO_AUTH_BASE'],
  });

  await config.validate();

  return config;
}

export default registerAs(
  'db',
  async (): Promise<ConfigType<typeof getDbConfig>> => {
    return getDbConfig();
  },
);
