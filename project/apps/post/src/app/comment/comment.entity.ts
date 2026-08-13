import { Entity } from '@project/core';
import { CommentInterface } from '@project/shared-types';

export class CommentEntity implements Entity<string> {
  public id?: string;
  public text!: string;
  public authorId!: string;
  public postId!: string;
  public createdAt!: Date;

  constructor(comment: CommentInterface) {
    this.populate(comment);
  }

  public populate(comment: CommentInterface) {
    this.id = comment.id;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt;
  }

  public toPOGO() {
    return {
      id: this.id,
      text: this.text,
      authorId: this.authorId,
      postId: this.postId,
      createdAt: this.createdAt,
    };
  }
}
