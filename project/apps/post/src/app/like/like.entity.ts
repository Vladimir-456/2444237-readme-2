import { Entity } from '@project/core';
import { LikeInterface } from '@project/shared-types';
import { LikeDocument } from './like.model';
import { Prisma } from '@prisma/client';

type PrismaLike = Prisma.LikeGetPayload<{}>;

export class LikeEntity implements Entity<string, LikeInterface> {
  public id!: string;
  public postId!: string;
  public userId!: string;

  constructor(like: LikeInterface) {
    this.populate(like);
  }

  public populate(like: LikeInterface) {
    this.id = like.id;
    this.postId = like.postId;
    this.userId = like.userId;
    return this;
  }

  public toPOJO(): LikeInterface {
    if (!this.id) {
      throw new Error('Like id is not defined');
    }

    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    };
  }

  static fromObject(like: LikeDocument) {
    return new LikeEntity({
      ...like,
      id: like._id.toString(),
    });
  }

  static fromPrisma(like: PrismaLike): LikeEntity {
    return new LikeEntity(like);
  }
}
