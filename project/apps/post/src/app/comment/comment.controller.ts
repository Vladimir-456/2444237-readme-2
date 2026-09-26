import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment';
import { CommentService } from './comment.service';
import { AUTHOR_ID } from '../post/post.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentRDO } from './rdo/comment.rdo';
import { fillDTO } from '@project/helpers';
import { QueryCommentDto } from './dto/query-comment';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiResponse({ status: 201, type: CommentRDO })
  @Post('post/:postId/comments')
  async createComment(
    @Body() dto: CreateCommentDto,
    @Param('postId') postId: string,
  ) {
    const comment = await this.commentService.createComment(
      dto,
      postId,
      AUTHOR_ID,
    );
    return fillDTO(CommentRDO, comment);
  }
  @ApiResponse({ status: 200, type: [CommentRDO] })
  @Get('post/:postId/comments')
  async getComments(
    @Param('postId') postId: string,
    @Query() query: QueryCommentDto,
  ) {
    const comments = await this.commentService.getComments(postId, query);
    return fillDTO(CommentRDO, comments);
  }
  @ApiResponse({ status: 200 })
  @Delete('post/:postId/comments/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId, AUTHOR_ID);
  }
}
