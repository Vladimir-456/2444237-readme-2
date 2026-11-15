import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { UserIdInterceptor } from "./interceptors/user-id.interceptor";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { createDtoMap, UpdatePostDTO } from "@project/shared-types";
import {PostDtoValidationPipe} from "@project/core"
import { Request } from 'express'

@UseFilters(AxiosExceptionFilter)
@Controller('posts')
export class PostController {
    constructor (
        private readonly httpService: HttpService
    ) {}

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Post('/')
    async create (@Req() req: Request, @Body(new PostDtoValidationPipe({createDto: createDtoMap, updateDto: {}})) dto: CreatePostDTO) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/`, dto, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })
        
        return data;
    }

    @UseGuards(CheckAuthGuard)
    @Post(':postId/repost')
    async repost(
        @Req() req: Request,
        @Param('postId', ParseUUIDPipe) postId: string,
    ) {
        const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Post}/${postId}/repost`,
        {},
        {
            headers: {
            Authorization: req.headers['authorization'],
            },
        },
        );

        return data;
    }

    @Get('/')
    async getPosts () {
        const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/`)
      
        return data;
    }

    
    @Get(':id')
    async getPostById (@Param('id') post_id: string) {
        const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${post_id}`)
    
        return data;
    }

    @UseGuards(CheckAuthGuard)
    @Patch(':id')
    async updatePostById(@Req() req: Request, @Param('id') post_id: string, @Body() dto: UpdatePostDTO) {
        const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Post}/${post_id}`, dto, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })

        return data
    }

    @UseGuards(CheckAuthGuard)
    @Delete(':id')
    async deletePostById (@Req() req: Request, @Param('id') post_id: string) {
        const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Post}/${post_id}`, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })
    
        return data;
    }

}