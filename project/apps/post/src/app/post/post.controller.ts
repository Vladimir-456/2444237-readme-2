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
} from '@nestjs/common';
import { PostService } from './post.service';
import { fillDTO } from '@project/helpers';
import { CreatePostRDO } from './rdo/create-post.rdo';
import { CreateLinkPostDto, CreatePhotoPostDto, CreatePostDTO, CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto } from './dto/create-dto.interface';
import { UpdatePostDTO } from './dto/update-dto.interface';
import { AUTHOR_ID, createDtoMap, updateDtoMap } from './post.constant';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PostQueryDto } from './dto/filter-dto.interface';
import { PostDtoValidationPipe } from '@project/core'
import { PostType } from '@project/shared-types';

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
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: 200, type: [CreatePostRDO] })
  @Get('/')
  async getPosts(@Query() query: PostQueryDto) {
    return this.postService.getPosts(query);
  }

  @ApiResponse({ status: 201, type: CreatePostRDO })
  @Post('/')
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
  async createPost(@Body(new PostDtoValidationPipe({createDto: createDtoMap, updateDto: {}})) dto: CreatePostDTO) {
    const created = await this.postService.createPost(dto, AUTHOR_ID);

    return fillDTO(CreatePostRDO, created);
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @Patch('/:id')
  async updatePost (@Param('id') id:  string, @Body() dto: UpdatePostDTO) {
    console.log(id)
    const pipe = new PostDtoValidationPipe({
    createDto: {},
    updateDto: updateDtoMap,
    getExistingPostType: (postId) => this.postService.getPostTypeById(postId) as Promise<string | null>,
    postId: id,
    });

    console.log(dto)

    const validationDto = await pipe.transform(dto, {
      metatype: undefined,
      type: 'body'
    })
    const updated = await this.postService.updatePost(id, validationDto);
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
