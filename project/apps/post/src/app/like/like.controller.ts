import { Controller, Delete, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { AUTHOR_ID } from '../post/post.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLikeRdo } from './rdo/create-like.rdo';

@ApiTags('Likes')
@Controller('post/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({ status: 201, type: CreateLikeRdo })
  @Post()
  async createLike(
    @Param('postId', new ParseUUIDPipe({ version: '4' })) postId: string,
  ) {
    return await this.likeService.createLike(postId, AUTHOR_ID);
  }

  @ApiResponse({ status: 200 })
  @Delete()
  async removeLike(
    @Param('postId', new ParseUUIDPipe({ version: '4' })) postId: string,
  ) {
    return await this.likeService.removeLike(postId, AUTHOR_ID);
  }
}
