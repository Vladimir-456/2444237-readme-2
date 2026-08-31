import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DBConfig, getMongoConnectString } from '@project/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      const dbConfig: DBConfig = {
        db: config.getOrThrow<string>('db.name'),
        host: config.getOrThrow<string>('db.host'),
        port: config.getOrThrow<number>('db.port'),
        user: config.getOrThrow<string>('db.user'),
        password: config.getOrThrow<string>('db.password'),
        authBase: config.getOrThrow<string>('db.authBase'),
      };

      return {
        uri: getMongoConnectString(dbConfig),
      };
    },
    inject: [ConfigService],
  };
}
