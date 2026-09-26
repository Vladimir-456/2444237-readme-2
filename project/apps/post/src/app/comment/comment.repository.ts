import { MongoRepository, PrismaRepository } from '@project/core';
import { CommentEntity } from './comment.entity';
import { CommentDocument } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';
import { PrismaClient } from '@prisma/client';
import { CommentInterface } from '@project/shared-types';
import { PrismaClientService } from '@project/models';
import { Injectable } from '@nestjs/common';
import { QueryCommentDto } from './dto/query-comment';

@Injectable()
export class CommentRepository extends PrismaRepository<
  CommentEntity,
  PrismaClient['comment'],
  CommentInterface
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.comment, (data) => CommentEntity.fromPrisma(data));
  }

  async createComment(comment: CommentInterface) {
    const newComment = await this.model.create({
      data: {
        id: comment.id,
        text: comment.text,
        author: comment.author,
        postId: comment.postId,
      },
    });
    return CommentEntity.fromPrisma(newComment);
  }

  async getComments(postId: string, query: QueryCommentDto) {
    const comments = await this.model.findMany({
      where: {
        postId,
      },

      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return comments.map((comment) => CommentEntity.fromPrisma(comment));
  }

  async deleteComment(commentId: string) {
    await this.model.deleteMany({
      where: {
        id: commentId,
      },
    });
  }
}
