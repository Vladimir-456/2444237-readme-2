import { Injectable } from '@nestjs/common';
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
import { PostInterface, PostStatus, PostType } from '@project/shared-types';
import { UpdatePostDTO } from './dto/update-dto.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getPost(id: string) {
    return await this.postRepository.findById(id);
  }

  public async getPosts() {
    const posts = await this.postRepository.findAll();

    return posts.map((post) => post.toPOJO());
  }

  public async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }

  async updatePost(id: string, dto: UpdatePostDTO) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    post.update(dto);
    const updatedPost = await this.postRepository.update(id, post);
    return updatedPost.toPOJO();
  }

  public async createPost(dto: CreatePostDTO, authorId: string) {
    switch (dto.type) {
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
        throw new Error('Invalid post type');
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
      type: PostType.VIDEO,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      publishDate: now,
      isRepost: false,
      tags: dto.tags ?? [],
      title: dto.title,
      link: dto.url,
    });

    const created = await this.postRepository.create(post);

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
      type: PostType.PHOTO,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      publishDate: now,
      isRepost: false,
      tags: dto.tags ?? [],
      imageUrl: dto.imageUrl,
    });

    const created = await this.postRepository.create(post);

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
      type: PostType.TEXT,
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

    const created = await this.postRepository.create(post);

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
      type: PostType.LINK,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      tags: dto.tags ?? [],
      publishDate: now,
      isRepost: false,
      description: dto.description ?? '',
      link: dto.link,
    });

    const created = await this.postRepository.create(post);

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
      type: PostType.QUOTE,
      status: PostStatus.PUBLISHED,
      createdAt: now,
      updatedAt: now,
      tags: dto.tags ?? [],
      publishDate: now,
      isRepost: false,
      text: dto.text,
      author: dto.author,
    });

    const created = await this.postRepository.create(post);

    return created.toPOJO();
  }
}
