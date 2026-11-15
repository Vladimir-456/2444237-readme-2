import { HttpService } from "@nestjs/axios";
import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateCommentDto, QueryCommentDto } from "@project/shared-types";
import { ApplicationServiceURL } from "./app.config";
import { Request } from 'express'
import { CheckAuthGuard } from "./guards/check-auth.guard";

@Controller('comments')
export class CommentsController {
    constructor (
            private readonly httpService: HttpService
    ) {}
    @UseGuards(CheckAuthGuard)
    @Post('/:postId')
    async createComment (
        @Req() req: Request,
        @Param('postId') postId: string, 
        @Body() dto: CreateCommentDto) {

        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/${postId}/comments`, dto, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })

        return data
    }

    @Get('/:postId')
    async getComments (
        @Param('postId') postId: string,
        @Query() query: QueryCommentDto,
    ) {
        const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${postId}/comments`)

        return data
    }

    @UseGuards(CheckAuthGuard)
    @Delete('/:postId/:commentId')
    async deleteComment (
        @Req() req: Request,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
    ) {
        const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Post}/${postId}/comments/${commentId}`, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })

        return data
    }
}