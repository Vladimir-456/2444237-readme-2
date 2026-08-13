import { BaseMemoryRepository } from '@project/core';
import { LikeEntity } from './like.entity';

export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
  create(like: LikeEntity): Promise<LikeEntity> {
    return this.save(like);
  }

  async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const like = Array.from(this.entities.values()).find((item) => {
      const data = item.toPOGO();

      return data.userId === userId && data.postId === postId;
    });

    return like ?? null;
  }

  async deleteByUserAndPost(userId: string, postId: string): Promise<void> {
    const like = await this.findByUserAndPost(userId, postId);

    if (like?.id) {
      await this.delete(like.id);
    }
  }
}
