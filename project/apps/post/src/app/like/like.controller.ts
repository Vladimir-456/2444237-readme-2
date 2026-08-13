import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async createLike(@Param('postId') postId: string, userId: string) {
    return await this.likeService.createLike(postId, userId);
  }

  @Delete()
  async removeLike(@Param('postId') postId: string, userId: string) {
    return await this.likeService.removeLike(postId, userId);
  }
}
