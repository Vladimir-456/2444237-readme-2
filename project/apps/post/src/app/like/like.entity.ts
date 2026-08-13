import { Entity } from '@project/core';
import { LikeInterface } from '@project/shared-types';

export class LikeEntity implements Entity<string> {
  public id?: string;
  public postId!: string;
  public userId!: string;
  public createdAt?: Date;

  constructor(like: LikeInterface) {
    this.populate(like);
  }

  public populate(like: LikeInterface) {
    this.id = like.id;
    this.postId = like.postId;
    this.userId = like.userId;
    this.createdAt = like.createdAt;
    return this;
  }

  public toPOGO() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }
}
