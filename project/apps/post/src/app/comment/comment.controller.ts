import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment';
import { CommentService } from './comment.service';
import { AUTHOR_ID } from '../post/post.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({ status: 201, type: CommentRDO })
  @Post('posts/:postId/comments')
  async createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto, AUTHOR_ID);
  }

  @ApiResponse({ status: 200, type: CommentRDO })
  @Get('posts/:postId/comments')
  async getComments(@Param('postId') postId: string) {
    return this.commentService.getComments(postId);
  }

  @ApiResponse({ status: 200, type: CommentRDO })
  @Post('posts/:postId/comments/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId, AUTHOR_ID);
  }
}
