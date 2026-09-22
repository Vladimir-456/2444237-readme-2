import { PrismaClient } from '@prisma/client';
import { PostEntity } from './post.entity';
import { PrismaRepository } from '@project/core';
import { PostInterface } from '@project/shared-types';
import { PrismaClientService } from '@project/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends PrismaRepository<
  PostEntity,
  PrismaClient['post'],
  PostInterface
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.post, (data) => PostEntity.fromPrisma(data));
  }

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.model.findMany();
    return posts.map((post) => PostEntity.fromPrisma(post));
  }
}
