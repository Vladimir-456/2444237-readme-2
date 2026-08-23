import { Entity } from '@project/core';
import { PostInterface } from '@project/shared-types';
import { PostDocument } from './post.model';

export class PostEntity implements Entity<string, PostInterface> {
  public id?: string;
  private post!: PostInterface;

  constructor(post: PostInterface) {
    this.populate(post);
  }

  public populate(post: PostInterface) {
    this.post = post;
    this.id = post.id;
    return this;
  }

  public update(data: Partial<PostInterface>) {
    this.post = {
      ...this.post,
      ...data,
      id: this.id!,
      updatedAt: new Date(),
    } as PostInterface;

    return this;
  }

  public toPOJO(): PostInterface {
    return {
      ...this.post,
      id: this.id!,
    };
  }

  static fromObject(post: PostDocument) {
    return new PostEntity({
      ...(post as unknown as PostInterface),
      id: post._id.toString(),
    });
  }
}
