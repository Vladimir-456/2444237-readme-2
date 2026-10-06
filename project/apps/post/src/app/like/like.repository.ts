import { PrismaRepository } from '@project/core';
import { LikeEntity } from './like.entity';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LikeInterface } from '@project/shared-types';
import { PrismaClientService } from '@project/models';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LikeRepository extends PrismaRepository<
  LikeEntity,
  PrismaClient['like'],
  LikeInterface
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.like, (data) => LikeEntity.fromPrisma(data));
  }

  async create(userId: string, postId: string): Promise<LikeEntity> {
    const newLike = await this.model.create({
      data: {
        id: randomUUID(),
        postId: userId,
        userId: postId,
        createAt: new Date(),
      },
    });
    return LikeEntity.fromPrisma(newLike);
  }

  async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const like = await this.model.findFirst({ where: { userId, postId } });

    if (!like) {
      return null;
    }

    return LikeEntity.fromPrisma(like);
  }

  async deleteByUserAndPost(userId: string, postId: string): Promise<void> {
    const like = await this.model.findFirst({ where: { userId, postId } });

    if (like) {
      await this.model.delete({ where: { id: like.id } });
    }
  }
}
