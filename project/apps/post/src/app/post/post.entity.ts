import { Entity } from '@project/core';
import { PostInterface } from '@project/shared-types';

export class PostEntity implements Entity<string> {
  public id?: string;
  private post!: PostInterface;

  constructor(post: PostInterface) {
    this.populate(post);
  }

  public populate(post: PostInterface) {
    this.post = post;
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
}
