import { Controller, Delete, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { fillDTO } from '@project/helpers';
import { CurrentUser } from '@project/core';
import { CreateLikeRdo, TokenPayload } from '@project/shared-types';
import { JwtAuthGuard } from '../post/guards/jwt-auth.guard';

@Controller('post/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLike(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @CurrentUser() user: TokenPayload
  ) {
    const like = await this.likeService.createLike(postId, user.id);
    return fillDTO(CreateLikeRdo, like);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeLike(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @CurrentUser() user: TokenPayload
  )
    {
    const deletedLike = await this.likeService.removeLike(postId, user.id);
    return deletedLike;
  }
}
