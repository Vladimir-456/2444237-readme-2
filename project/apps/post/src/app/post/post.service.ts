import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreatePostData,
  CreatePostDTO,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  PostInterface,
  PostQueryDto,
  PostStatus,
  PostType,
  UpdatePostDTO,
} from '@project/shared-types';

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

  public async deletePost(post_id: string, user_id: string) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.toPOJO().authorId !== user_id) {
      throw new ForbiddenException('You can only modify your own posts')
    }

    return await this.postRepository.delete(post_id);
  }

  async getCountPostByUser (authorId: string) {
    const count = await this.postRepository.getCountPostByUser(authorId)
    return {
      postsCount: count
    }
  }

    async repost(postId: string, userId: string) {
    const originalPost = await this.postRepository.findById(postId);

    if (!originalPost) {
      throw new NotFoundException('Post not found');
    }

    const original = originalPost.toPOJO();

    if (original.authorId === userId) {
      throw new BadRequestException('You cannot repost your own post');
    }

    const existingRepost = await this.postRepository.findByOriginalPostId(postId);

    if (existingRepost) {
      throw new ConflictException('Post has already been reposted');
    }

    const {
      id,
      comments,
      createdAt,
      updatedAt,
      ...repostData
    } = original;

    return this.postRepository.createRepost({
      ...repostData,
      authorId: userId,
      isRepost: true,
      updatedAt: new Date(),
      originalPostId: original.id,
      originalAuthorId: original.authorId,
      createdAt: new Date(),
    });
  }

  async updatePost(post_id: string, dto: UpdatePostDTO, user_id: string ) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.toPOJO().authorId !== user_id) {
      throw new ForbiddenException('You can only modify your own posts')
    }

    post.update(dto);

    const updatedPost = await this.postRepository.update(post_id, post);

    return updatedPost.toPOJO();
  }

  public async getPostTypeById (id: string) {
    const result = await this.postRepository.getPostTypeById(id)
    
    return result
  }

  public async createPost(dto: CreatePostDTO, authorId: string) : Promise<PostInterface>  {
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
