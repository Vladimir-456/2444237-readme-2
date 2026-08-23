import { Controller, Delete, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { AUTHOR_ID } from '../post/post.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLikeRdo } from './rdo/create-like.rdo';
import { ParseMongoIdPipe } from '@project/core';
import { fillDTO } from '@project/helpers';

@ApiTags('Likes')
@Controller('post/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({ status: 201, type: CreateLikeRdo })
  @Post()
  async createLike(@Param('postId', new ParseMongoIdPipe()) postId: string) {
    const like = await this.likeService.createLike(postId, AUTHOR_ID);
    return fillDTO(CreateLikeRdo, like);
  }

  @ApiResponse({ status: 200 })
  @Delete()
  async removeLike(@Param('postId', new ParseMongoIdPipe()) postId: string) {
    const deletedLike = await this.likeService.removeLike(postId, AUTHOR_ID);
    return deletedLike;
  }
}
