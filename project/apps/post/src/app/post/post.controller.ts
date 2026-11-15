import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { fillDTO } from '@project/helpers';
import { CreatePostRDO } from './rdo/create-post.rdo';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload, PostDtoValidationPipe } from '@project/core'
import { createDtoMap, CreateLinkPostDto, CreatePhotoPostDto, CreatePostDTO, CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto, PostQueryDto, PostType, RequestWithUser, TokenPayload, updateDtoMap, UpdatePostDTO } from '@project/shared-types';
import { NotifyService } from '../notify/notify.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express'

@ApiExtraModels(
  CreateTextPostDto,
  CreatePhotoPostDto,
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto,
)
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly notifyService: NotifyService
  ) 
  {}

  @ApiResponse({ status: 200, type: [CreatePostRDO] })
  @Get('/')
  async getPosts(@Query() query: PostQueryDto) {
    return this.postService.getPosts(query);
  }

  @ApiResponse({ status: 201, type: CreatePostRDO })
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new post',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            oneOf: [
              { $ref: getSchemaPath(CreateTextPostDto)},
              { $ref: getSchemaPath(CreatePhotoPostDto)},
              { $ref: getSchemaPath(CreateLinkPostDto)},
              { $ref: getSchemaPath(CreateQuotePostDto)},
              { $ref: getSchemaPath(CreateVideoPostDto)},
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
        },
      },
    },
  })
  async createPost(
    @Body(new PostDtoValidationPipe({createDto: createDtoMap, updateDto: {}})) dto: CreatePostDTO,
    @CurrentUser() user: { id: string; email: string }
  ) {
    const created = await this.postService.createPost(dto, user.id);

    await this.notifyService.notifyPostPublished({
      postId: created.id,
      title: 'title' in created ? created.title : '',
      authorId: created.authorId,
      authorEmail: user.email,
    })

    return fillDTO(CreatePostRDO, created);
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.postService.deletePost(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:authorId/count')
  async getPostCountByUser (
    @Param('authorId') authorId: string
  ) {
    const result = await this.postService.getCountPostByUser(authorId)

    return result
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/repost')
  async repost(
    @CurrentUser() user: TokenPayload,
    @Param('postId') postId: string
  ) {
    return this.postService.repost(postId, user.id)
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updatePost (@CurrentUser() user: CurrentUserPayload, @Param('id') id:  string, @Body() dto: UpdatePostDTO) {
    const pipe = new PostDtoValidationPipe({
      createDto: {},
      updateDto: updateDtoMap,
      getExistingPostType: (postId) => this.postService.getPostTypeById(postId) as Promise<string | null>,
      postId: id,
    });

    const validationDto = await pipe.transform(dto, {
      metatype: undefined,
      type: 'body'
    })
    const updated = await this.postService.updatePost(id, validationDto, user.id);
    return fillDTO(CreatePostRDO, updated);
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @Get('/:id')
  async getPost(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    if (!post) throw new NotFoundException('Post not found');
    return fillDTO(CreatePostRDO, post.toPOJO());
  }

}
