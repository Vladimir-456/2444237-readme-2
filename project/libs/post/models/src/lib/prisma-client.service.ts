import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({
  path: path.resolve(process.cwd(), 'libs/post/models/.env'),
});

@Injectable()
export class PrismaClientService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const adapter = new PrismaPg({
      connectionString,
    });
    super({
      adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
