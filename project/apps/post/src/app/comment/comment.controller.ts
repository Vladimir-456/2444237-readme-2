import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment';
import { CommentService } from './comment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDTO } from '@project/helpers';
import { QueryCommentDto } from './dto/query-comment';
import { CurrentUser } from '@project/core';
import { CommentRDO, TokenPayload } from '@project/shared-types';
import { JwtAuthGuard } from '../post/guards/jwt-auth.guard';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post/:postId/comments')
  async createComment(
    @Body() dto: CreateCommentDto,
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @CurrentUser() user: TokenPayload
  ) {
    const comment = await this.commentService.createComment(
      dto,
      postId,
      user.id,
    );
    return fillDTO(CommentRDO, comment);
  }
  
  @Get('post/:postId/comments')
  async getComments(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @Query() query: QueryCommentDto,
  ) {
    const comments = await this.commentService.getComments(postId, query);
    return fillDTO(CommentRDO, comments);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('post/:postId/comments/:commentId')
  async deleteComment(
    @Param('commentId', new ParseUUIDPipe()) commentId: string,
    @CurrentUser() user: TokenPayload
  ) {
    return this.commentService.deleteComment(commentId, user.id);
  }
}
