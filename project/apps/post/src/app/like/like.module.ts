import { Module } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeController } from './like.controller';

@Module({
  controllers: [LikeController],
  providers: [LikeRepository],
})
export class LikeModule {}
