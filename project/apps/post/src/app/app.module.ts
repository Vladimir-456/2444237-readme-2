import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';
import { getMongooseOptions, mongoConfig } from '@project/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaClientModule } from '@project/models';

const ENV_POST_FILE_PATH = 'apps/post/post.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
      envFilePath: ENV_POST_FILE_PATH,
    }),
    // MongooseModule.forRootAsync(getMongooseOptions()),
    PostModule,
    CommentModule,
    LikeModule,
    PrismaClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
