import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { fillDTO } from '@project/helpers';
import { CreatePostRDO } from './rdo/create-post.rdo';
import { CreatePostDTO } from './dto/create-dto.interface';
import { UpdatePostDTO } from './dto/update-dto.interface';
import { AUTHOR_ID } from './post.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: 200, type: [CreatePostRDO] })
  @Get('/')
  async getPosts() {
    return this.postService.getPosts();
  }

  @ApiResponse({ status: 201, type: CreatePostRDO })
  @Post('/')
  async createPost(@Body() dto: CreatePostDTO) {
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
  async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDTO) {
    return this.postService.updatePost(id, dto);
  }

  @ApiResponse({ status: 200, type: CreatePostRDO })
  @Get('/:id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }
}
