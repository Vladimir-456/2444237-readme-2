import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';

import {
  CommentRDO,
  CreateCommentDto,
  QueryCommentDto,
} from '@project/shared-types';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: 'Создать комментарий',
    description: 'Создаёт новый комментарий к указанной публикации.',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    description: 'Уникальный идентификатор публикации',
    type: String,
    required: true,
    format: 'uuid',
    example: '3ad1c41523ca94e2b3fb76bf',
  })
  @ApiBody({
    type: CreateCommentDto,
    description: 'Данные для создания комментария',
  })
  @ApiCreatedResponse({
    description: 'Комментарий успешно создан',
    type: CommentRDO,
  })
  @UseGuards(CheckAuthGuard)
  @Post(':postId')
  async createComment(
    @Req() req: Request,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDto,
  ): Promise<CommentRDO> {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Post}/${postId}/comments`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

  @ApiOperation({
    summary: 'Получить комментарии публикации',
    description:
      'Возвращает список комментариев к указанной публикации с поддержкой пагинации.',
  })
  @ApiParam({
    name: 'postId',
    description: 'Уникальный идентификатор публикации',
    type: String,
    required: true,
    format: 'uuid',
    example: '3ad1c41523ca94e2b3fb76bf',
  })
  @ApiQuery({
    type: QueryCommentDto,
    description: 'Параметры пагинации и фильтрации комментариев',
  })
  @ApiOkResponse({
    description: 'Список комментариев успешно получен',
    type: [CommentRDO],
  })
  @Get(':postId')
  async getComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: QueryCommentDto,
  ): Promise<CommentRDO[]> {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Post}/${postId}/comments`,
      {
        params: query,
      },
    );

    return data;
  }

  @ApiOperation({
    summary: 'Удалить комментарий',
    description: 'Удаляет комментарий из указанной публикации.',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    description: 'Уникальный идентификатор публикации',
    type: String,
    required: true,
    format: 'uuid',
    example: '3ad1c41523ca94e2b3fb76bf',
  })
  @ApiParam({
    name: 'commentId',
    description: 'Уникальный идентификатор комментария',
    type: String,
    required: true,
    format: 'uuid',
    example: '8f1d2b7e-4b6a-4f7e-9f21-5f9d3a8f1a2b',
  })
  @ApiNoContentResponse({
    description: 'Комментарий успешно удалён',
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':postId/:commentId')
  async deleteComment(
    @Req() req: Request,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Post}/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );
  }
}