import { Entity } from '@project/core';
import { LikeInterface } from '@project/shared-types';
import { LikeDocument } from './like.model';

export class LikeEntity implements Entity<string, LikeInterface> {
  public id: string;
  public postId!: string;
  public userId!: string;
  public createdAt: Date;

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

  public toPOJO(): LikeInterface {
    if (!this.id) {
      throw new Error('Like id is not defined');
    }

    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }

  static fromObject(like: LikeDocument) {
    return new LikeEntity({
      ...like,
      id: like._id.toString(),
    });
  }
}
