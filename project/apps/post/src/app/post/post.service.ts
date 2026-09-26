import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreatePostDTO,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './dto/create-dto.interface';
import { PostEntity } from './post.entity';
import {
  PostInterface,
  PostStatus,
  PostType,
} from '@project/shared-types';
import { UpdatePostDTO } from './dto/update-dto.interface';
import { PostQueryDto } from './dto/filter-dto.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getPost(id: string) {
    return await this.postRepository.findById(id);
  }

  public async getPosts(query: PostQueryDto) {
    const posts = await this.postRepository.findAll(query);

    return posts.map((post) => post.toPOJO());
  }

  public async deletePost(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.postRepository.delete(id);
  }

  async updatePost(id: string, dto: UpdatePostDTO) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.update(dto);

    const updatedPost = await this.postRepository.update(id, post);
    return updatedPost.toPOJO();
  }

  public async createPost(dto: CreatePostDTO, authorId: string) {
    switch (dto.typePost) {
      case PostType.VIDEO:
        return this.createVideoPost(dto, authorId);
      case PostType.PHOTO:
        return this.createPhotoPost(dto, authorId);
      case PostType.TEXT:
        return this.createTextPost(dto, authorId);
      case PostType.LINK:
        return this.createLinkPost(dto, authorId);
      case PostType.QUOTE:
        return this.createQuotePost(dto, authorId);
      default:
        throw new BadRequestException('Invalid post type');
    }
  }

  private async createVideoPost(
    dto: CreateVideoPostDto,
    authorId: string,
  ): Promise<PostInterface> {
    const now = new Date();
    const post = new PostEntity({
      id: crypto.randomUUID(),
      authorId,
      typePost: PostType.VIDEO,
      status: PostStatus.PUBLISHED,
      url: dto.url,
      createdAt: now,
      updatedAt: now,
      publishDate: now,
      isRepost: false,
      tags: dto.tags ?? [],
      title: dto.title,
    });

    const created = await this.postRepository.save(post);

    return created.toPOJO();
  }

  private async createPhotoPost(
    dto: CreatePhotoPostDto,
    authorId: string,
  ): Promise<PostInterface> {
    const now = new Date();
    const post = new PostEntity({
      id: crypto.randomUUID(),
      authorId,
      typePost: PostType.PHOTO,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      publishDate: now,
      isRepost: false,
      tags: dto.tags ?? [],
      imageUrl: dto.imageUrl,
    });

    const created = await this.postRepository.save(post);

    return created.toPOJO();
  }

  private async createTextPost(
    dto: CreateTextPostDto,
    authorId: string,
  ): Promise<PostInterface> {
    const now = new Date();
    const post = new PostEntity({
      id: crypto.randomUUID(),
      authorId,
      typePost: PostType.TEXT,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      tags: dto.tags ?? [],
      publishDate: now,
      isRepost: false,
      title: dto.title,
      preview: dto.preview,
      text: dto.text,
    });

    const created = await this.postRepository.save(post);

    return created.toPOJO();
  }

  private async createLinkPost(
    dto: CreateLinkPostDto,
    authorId: string,
  ): Promise<PostInterface> {
    const now = new Date();
    const post = new PostEntity({
      id: crypto.randomUUID(),
      authorId,
      typePost: PostType.LINK,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      tags: dto.tags ?? [],
      publishDate: now,
      isRepost: false,
      description: dto.description ?? '',
      link: dto.link,
    });

    const created = await this.postRepository.save(post);

    return created.toPOJO();
  }

  private async createQuotePost(
    dto: CreateQuotePostDto,
    authorId: string,
  ): Promise<PostInterface> {
    const now = new Date();
    const post = new PostEntity({
      id: crypto.randomUUID(),
      authorId,
      typePost: PostType.QUOTE,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      tags: dto.tags ?? [],
      publishDate: now,
      isRepost: false,
      text: dto.text,
      author: dto.author,
    });

    const created = await this.postRepository.save(post);

    return created.toPOJO();
  }
}
