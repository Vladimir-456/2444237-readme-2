import { BaseMemoryRepository } from '@project/core';
import { PostEntity } from './post.entity';

export class PostRepository extends BaseMemoryRepository<PostEntity> {
  async create(post: PostEntity): Promise<PostEntity> {
    return this.save(post);
  }

  async deletePost(id: string): Promise<void> {
    this.delete(id);
  }

  async findAll() {
    return Array.from(this.entities.values());
  }
}
