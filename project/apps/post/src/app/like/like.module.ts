import { Module } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeController } from './like.controller';
import { PostModule } from '../post/post.module';
import { LikeService } from './like.service';

@Module({
  imports: [PostModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
