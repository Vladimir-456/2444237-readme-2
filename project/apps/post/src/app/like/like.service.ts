import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { PostRepository } from '../post/post.repository';
import { PostStatus } from '@project/shared-types';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createLike(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.toPOJO().status !== PostStatus.PUBLISHED) {
      throw new ConflictException('Likes are allowed only for published posts');
    }

    const existingLike = await this.likeRepository.findByUserAndPost(
      userId,
      postId,
    );

    if (existingLike) {
      throw new ConflictException('User has already liked this post');
    }

    const like = new LikeEntity({
      id: crypto.randomUUID(),
      postId,
      userId,
      createdAt: new Date(),
    });

    const created = await this.likeRepository.create(like);

    return created.toPOGO();
  }

  async removeLike(postId: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.likeRepository.deleteByUserAndPost(userId, postId);
  }
}
