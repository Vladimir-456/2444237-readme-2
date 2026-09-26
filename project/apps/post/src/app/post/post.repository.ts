import { PostStatus, Prisma, PrismaClient } from '@prisma/client';
import { PostEntity } from './post.entity';
import { PrismaRepository } from '@project/core';
import { PostInterface, PostSort } from '@project/shared-types';
import { PrismaClientService } from '@project/models';
import { Injectable } from '@nestjs/common';
import { PostQueryDto } from './dto/filter-dto.interface';

@Injectable()
export class PostRepository extends PrismaRepository<
  PostEntity,
  PrismaClient['post'],
  PostInterface
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.post, (data) => PostEntity.fromPrisma(data));
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
