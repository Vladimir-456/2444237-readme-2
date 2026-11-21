import { PostStatus, Prisma, PrismaClient } from '@prisma/client';
import { PostEntity } from './post.entity';
import { PrismaRepository } from '@project/core';
import { CreatePostData, PostInterface, PostQueryDto, PostSort } from '@project/shared-types';
import { PrismaClientService } from '@project/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends PrismaRepository<
  PostEntity,
  PrismaClient['post'],
  PostInterface
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.post, (data) => PostEntity.fromCreatedfromPrisma(data));
  }

  async findAll(query: PostQueryDto): Promise<PostEntity[]> {
    const { page = 1, limit = 25, sort = PostSort.NEWEST } = query;
    const skip = (page - 1) * limit;

    const posts = await this.model.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: {
        id: true,
        authorId: true,
        tags: true,
        status: true,
        isRepost: true,
        createdAt: true,
        updatedAt: true,
        publishDate: true,
        typePost: true,
        title: true,
        url: true,
        preview: true,
        text: true,
        author: true,
        imageUrl: true,
        link: true,
        description: true,
        originalPostId: true,
        originalAuthorId: true,

        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: this.getOrderBy(sort),
      skip,
      take: limit,
    });
    return posts.map((post) => PostEntity.fromPrisma(post));
  }

  async getCountPostByUser (authorId: string) {
    return this.model.count({
      where: {
        authorId,
      },
    });
  }

  async findByOriginalPostId (postId: string) {
    return this.model.findFirst({
      where: {
        originalPostId: postId
      }
    })
  }

  async getPostTypeById (id: string) {
    const postType = await this.model.findUnique({
      where: {id},
      select: {
        typePost: true
      }
    })

    return postType?.typePost
  }

  async createRepost(data: CreatePostData) {
    console.log('CREATE REPOST DATA:', data);
    const post = await this.model.create({
      data,
    });

    return PostEntity.fromCreatedfromPrisma(post)
  }

  private getOrderBy(sort: PostSort): Prisma.PostOrderByWithRelationInput[] {
    switch (sort) {
      case PostSort.MOST_LIKED:
        return [
          { likes: { _count: 'desc' } },
          { publishDate: 'desc' },
          { id: 'desc' },
        ];

      case PostSort.MOST_DISCUSSED:
        return [
          { comments: { _count: 'desc' } },
          { publishDate: 'desc' },
          { id: 'desc' },
        ];

      case PostSort.NEWEST:
      default:
        return [{ publishDate: 'desc' }, { id: 'desc' }];
    }
  }
}
