import { Entity } from '@project/core';
import { PostInterface } from '@project/shared-types';
import { PostType } from '@prisma/client';
import { PostType as DomainPostType, PostStatus } from '@project/shared-types';
import { PostDocument } from './post.model';
import { Prisma } from '@prisma/client';

export type PrismaPost = Prisma.PostGetPayload<{}>;

export class PostEntity implements Entity<string, PostInterface> {
  public id: string;
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

  static fromPrisma(post: PrismaPost): PostEntity {
    switch (post.typePost) {
      case PostType.TEXT:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.TEXT,
          status: PostStatus.PUBLISHED,
          title: post.title as string,
          preview: post.preview as string,
          text: post.text as string,
        });
      case PostType.VIDEO:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.VIDEO,
          status: PostStatus.PUBLISHED,
          title: post.title as string,
          url: post.url as string,
        });
      case PostType.PHOTO:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.PHOTO,
          status: PostStatus.PUBLISHED,
          imageUrl: post.imageUrl as string,
        });
      case PostType.QUOTE:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.QUOTE,
          status: PostStatus.PUBLISHED,
          text: post.text as string,
          author: post.author as string,
        });

      case PostType.LINK:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.LINK,
          status: PostStatus.PUBLISHED,
          link: post.link as string,
          description: post.description as string,
        });

      default:
        throw new Error('Invalid post type');
    }
  }
}
