import { Entity } from '@project/core';
import { CommentInterface } from '@project/shared-types';
import { CommentDocument } from './comment.model';
import { PrismaPost } from '../post/post.entity';
import { Prisma } from '@prisma/client';

type PrismaComment = Prisma.CommentGetPayload<{}>;

export class CommentEntity implements Entity<string, CommentInterface> {
  public id: string;
  public text!: string;
  public author!: string;
  public postId!: string;

  constructor(comment: CommentInterface) {
    this.populate(comment);
  }

  public populate(comment: CommentInterface) {
    this.id = comment.id;
    this.text = comment.text;
    this.author = comment.author;
    this.postId = comment.postId;

    return this;
  }

  public toPOJO(): CommentInterface {
    return {
      id: this.id,
      text: this.text,
      author: this.author,
      postId: this.postId,
    };
  }

  // static fromObject(comment: CommentDocument) {
  //   return new CommentEntity({
  //     ...comment,
  //     id: comment._id.toString(),
  //   });
  // }

  static fromPrisma(comment: PrismaComment) {
    return new CommentEntity(comment);
  }
}
