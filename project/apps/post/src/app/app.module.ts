import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientModule } from '@project/models';
import { applicationConfig } from '@project/config-users';
import { NotifyModule } from './notify/notify.module';
const ENV_POST_FILE_PATH = 'apps/post/post.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfig],
      envFilePath: ENV_POST_FILE_PATH,
    }),
    PostModule,
    CommentModule,
    NotifyModule,
    LikeModule,
    PrismaClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
