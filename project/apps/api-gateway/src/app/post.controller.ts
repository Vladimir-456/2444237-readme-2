import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { UserIdInterceptor } from "./interceptors/user-id.interceptor";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { createDtoMap, CreateLinkPostDto, CreatePhotoPostDto, CreatePostDTO, CreatePostRDO, CreatePostWithUserRDO, CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto, PostInterface, PostQueryDto, PostType, UpdatePostDTO, UserInterface } from "@project/shared-types";
import {PostDtoValidationPipe} from "@project/core"
import { Request } from 'express'
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

@UseFilters(AxiosExceptionFilter)
@Controller('posts')
@ApiTags('Посты')
@ApiExtraModels(
  CreateTextPostDto,
  CreatePhotoPostDto,
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto,
)
export class PostController {
    constructor (
        private readonly httpService: HttpService
    ) {}

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @ApiResponse({ status: 201, type: CreatePostRDO })
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового поста',
        description: 'Создает новый пост',
    })
    @ApiBody({
        required: true,
        schema: {
            oneOf: [
            { $ref: getSchemaPath(CreateTextPostDto) },
            { $ref: getSchemaPath(CreatePhotoPostDto) },
            { $ref: getSchemaPath(CreateLinkPostDto) },
            { $ref: getSchemaPath(CreateQuotePostDto) },
            { $ref: getSchemaPath(CreateVideoPostDto) },
            ],
            discriminator: {
            propertyName: 'typePost',
            mapping: {
                [PostType.TEXT]: getSchemaPath(CreateTextPostDto),
                [PostType.PHOTO]: getSchemaPath(CreatePhotoPostDto),
                [PostType.LINK]: getSchemaPath(CreateLinkPostDto),
                [PostType.QUOTE]: getSchemaPath(CreateQuotePostDto),
                [PostType.VIDEO]: getSchemaPath(CreateVideoPostDto),
            },
            },
        },
        })
    @Post('/')
    async create (@Req() req: Request, @Body(new PostDtoValidationPipe({createDto: createDtoMap, updateDto: {}})) dto: CreatePostDTO) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Post}/`, dto, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })
        
        return data;
    }

    @UseGuards(JwtAuthGuard, CheckAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Репоста поста',
        description: 'Создает репост для конкретного поста',
    })
    @ApiBearerAuth()
    @ApiParam({
        name: 'postId',
        description: 'Уникальный идентификатор поста',
        type: String,
        required: true,
        format: 'uuid',
        example: '3ad1c41523ca94e2b3fb76bf',
    })
    @ApiCreatedResponse({
        description: 'Репост успешно создан',
        type: CreatePostRDO,
    })
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

    @UseGuards(JwtAuthGuard, CheckAuthGuard)
    @Get('/')
    @ApiOperation({
        summary: 'Получение всех постов',
        description: 'Вернет все посты с данными авторов',
    })
    @ApiBearerAuth()
    @ApiQuery({
        type: PostQueryDto,
    })
    @ApiOkResponse({
        description: 'Посты с данными авторов',
        type: [CreatePostWithUserRDO],
    })
    async getPosts (
        @Req() req: Request,
        @Query() query: PostQueryDto
    ) {
        const postsResponse = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}`)

        const posts = postsResponse.data as PostInterface[]

        const authorIds = [...new Set(posts.map((post) => post.authorId))];

        const userDataResponse = await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/bulk`, {
            params: {
                ids: authorIds.join(','),
                query
            },
            headers: {
                Authorization: req.headers['authorization'],
            },
            
        })

        const users = userDataResponse.data as UserInterface[];

        const userData = new Map(
            users.map((user) => [user.id, user]),
        );

        return posts.map((post) => ({
            ...post,
            author: userData.get(post.authorId) ?? null,
        }));
    }

    @ApiOperation({
        summary: 'Получение поста по id',
        description: 'Вернет один пост по его id.',
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'Уникальный идентификатор поста',
        type: String,
        required: true,
        example: '3ad1c41523ca94e2b3fb76bf',
    })
    @ApiOkResponse({
        description: 'Найден пост',
        type: CreatePostRDO,
    })
    async getPostById (@Param('id') post_id: string) {
        const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${post_id}`)
    
        return data;
    }


    @ApiOperation({
        summary: 'Обновление поста',
        description: 'Обновление поста.',
    })
    @UseGuards(JwtAuthGuard, CheckAuthGuard)
    @ApiParam({
        name: 'id',
        description: 'Уникальный идентификатор поста',
        type: String,
        required: true,
        example: '3ad1c41523ca94e2b3fb76bf',
    })
    @ApiResponse({ status: 200, type: CreatePostRDO })
    @ApiOkResponse({
        description: 'Post successfully updated',
        type: CreatePostRDO,
    })
    @Patch(':id')
    async updatePostById(@Req() req: Request, @Param('id') post_id: string, @Body() dto: UpdatePostDTO) {
        const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Post}/${post_id}`, dto, {
            headers: {
                Authorization: req.headers['authorization']
            }
        })

        return data
    }

    @ApiOperation({
        summary: 'Удаление поста',
        description: 'Удаление существующего поста',
    })
    @ApiResponse({ status: 200, type: CreatePostRDO })
    @ApiParam({
        name: 'id',
        description: 'Уникальный идентификатор поста',
        type: String,
        required: true,
        example: '3ad1c41523ca94e2b3fb76bf',
    })
    @ApiOkResponse({
        description: 'Post successfully deleted',
        type: CreatePostRDO,
    })
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