import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [PostModule, CommentModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
