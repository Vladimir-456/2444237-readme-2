import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClientModule } from '@project/models';
import { NotifyModule } from '../notify/notify.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTOptions, jwtConfig } from '@project/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';


@Module({
  imports: [JwtModule.registerAsync(
  {inject: [ConfigService],useFactory: getJWTOptions,}),
  PrismaClientModule, 
  NotifyModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [jwtConfig],
    envFilePath: 'apps/post/post.env',
  })],
  providers: [PostRepository, PostService, JwtAccessStrategy],
  controllers: [PostController],
  exports: [PostRepository],
})
export class PostModule {}
