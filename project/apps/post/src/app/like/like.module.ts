import { Module } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeController } from './like.controller';
import { PostModule } from '../post/post.module';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeModel, LikeSchema } from './like.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LikeModel.name, schema: LikeSchema }]),
    PostModule,
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
