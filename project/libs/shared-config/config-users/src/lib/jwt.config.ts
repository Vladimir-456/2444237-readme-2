import { plainToClass } from 'class-transformer';
import { JwtConfig } from './jwt/jwt';
import { ConfigType, registerAs } from '@nestjs/config';

export interface JWTConfig {
  accessTokenSecret: string;
  accessExpiresIn: string;
  refreshTokenSecret: string;
  refreshExpiresIn: string;
}

async function getJWTConfig() {
  const config = plainToClass(JwtConfig, {
    accessTokenSecret: process.env['JWT_ACCESS_SECRET'],
    accessExpiresIn: process.env['JWT_ACCESS_EXPIRES_IN'],
    refreshTokenSecret: process.env['JWT_REFRESH_SECRET'],
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN']
  });

  await config.validate();

  return config;
}

export default registerAs(
  'jwt',
  async (): Promise<ConfigType<typeof getJWTConfig>> => getJWTConfig(),
);
