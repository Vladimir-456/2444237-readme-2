import { BaseMemoryRepository } from '@project/core';
import { CommentEntity } from './comment.entity';

export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
  async createComment(comment: CommentEntity) {
    return this.save(comment);
  }

  async deleteComment(id: string) {
    return this.delete(id);
  }

  async getComments(postId: string) {
    const comments = Array.from(this.entities.values());
    return comments.filter((comment) => comment.postId === postId);
  }
}
