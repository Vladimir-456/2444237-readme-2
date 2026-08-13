import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentInterface } from '@project/shared-types';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { CreateCommentDto } from './dto/create-comment';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createComment(comment: CreateCommentDto, authorId: string) {
    const now = new Date();
    const post = await this.postRepository.findById(comment.postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const commentEntity = new CommentEntity({
      id: crypto.randomUUID(),
      text: comment.text,
      authorId: authorId,
      postId: comment.postId,
      createdAt: now,
    });

    const createdComment =
      await this.commentRepository.createComment(commentEntity);

    return createdComment.toPOGO();
  }

  async getComments(postId: string) {
    const comments = await this.commentRepository.getComments(postId);
    return comments.map((comment) => comment.toPOGO());
  }

  async deleteComment(commentId: string, authorId: string) {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    const commentData = comment.toPOGO();

    if (commentData.authorId !== authorId) {
      throw new ForbiddenException('You can delete only your own comment');
    }
    return await this.commentRepository.deleteComment(commentId);
  }
}
