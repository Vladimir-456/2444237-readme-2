import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { PostModule } from '../post/post.module';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeModel, LikeSchema } from './like.model';
import { PrismaClientModule } from '@project/models';
import { LikeRepository } from './like.repository';

@Module({
  imports: [PostModule, PrismaClientModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
