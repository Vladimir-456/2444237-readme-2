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

@Controller('likes')
export class LikesController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
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