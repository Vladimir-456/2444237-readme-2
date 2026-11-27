import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreateLikeRdo } from '@project/shared-types';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Лайки')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @ApiOperation({
    summary: 'Лайк на пост',
    description: 'Создает лайк для конкретного поста',
  })
  @ApiResponse({ status: 201, type: CreateLikeRdo })
  @ApiParam({
    name: 'postId',
    description: 'Уникальный идентификатор поста',
    type: String,
    required: true,
    format: 'uuid',
    example: '3ad1c41523ca94e2b3fb76bf',
  })
  @Post('/:postId')
  async createLike(
    @Req() req: Request,
    @Param('postId', ParseUUIDPipe) postId: string,
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Post}/${postId}/likes`,
      {},
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiOperation({
    summary: 'Удаление лайка',
    description: 'Удаляет лайк с конкретного поста',
  })
  @ApiParam({
    name: 'postId',
    description: 'Уникальный идентификатор поста',
    type: String,
    required: true,
    format: 'uuid',
    example: '3ad1c41523ca94e2b3fb76bf',
  })
  @ApiResponse({ status: 200 })
  @Delete('/:postId')
  async removeLike(
    @Req() req: Request,
    @Param('postId', ParseUUIDPipe) postId: string,
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Post}/${postId}/likes`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }
}