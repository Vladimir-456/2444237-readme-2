import { Entity } from '@project/core';
import { PostInterface } from '@project/shared-types';
import { PostType } from '@prisma/client';
import { PostType as DomainPostType, PostStatus } from '@project/shared-types';
import { Prisma } from '@prisma/client';

export type PrismaPostCreated = Prisma.PostGetPayload<{
  select: {
    id: true;
    authorId: true;
    tags: true;
    status: true;
    isRepost: true;
    originalPostId: true;
    originalAuthorId: true;
    createdAt: true;
    updatedAt: true;
    publishDate: true;
    typePost: true;
    title: true;
    url: true;
    preview: true;
    text: true;
    author: true;
    imageUrl: true;
    link: true;
    description: true;
  };
}>;

export type PrismaPost = Prisma.PostGetPayload<{
  select: {
    id: true;
    authorId: true;
    tags: true;
    status: true;
    isRepost: true;
    originalPostId: true;
    originalAuthorId: true;
    createdAt: true;
    updatedAt: true;
    publishDate: true;
    typePost: true;
    title: true;
    url: true;
    preview: true;
    text: true;
    author: true;
    imageUrl: true;
    link: true;
    description: true;
    _count: {
      select: {
        comments: true;
        likes: true;
      };
    };
  };
}>;

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


  static fromCreatedfromPrisma (post: PrismaPostCreated) {
    const base = {
    ...post,
    id: post.id.toString(),
    status: PostStatus.PUBLISHED,
    };
    switch (post.typePost) {
    case PostType.TEXT:
      return new PostEntity({
        ...base,
        typePost: DomainPostType.TEXT,
        title: post.title as string,
        preview: post.preview as string,
        text: post.text as string,
        originalAuthorId: undefined,
        originalPostId: undefined,
      });

    case PostType.VIDEO:
      return new PostEntity({
        ...base,
        typePost: DomainPostType.VIDEO,
        title: post.title as string,
        url: post.url as string,
        originalAuthorId: undefined,
        originalPostId: undefined,
      });

    case PostType.PHOTO:
      return new PostEntity({
        ...base,
        typePost: DomainPostType.PHOTO,
        imageUrl: post.imageUrl as string,
        originalAuthorId: undefined,
        originalPostId: undefined,
      });

    case PostType.QUOTE:
      return new PostEntity({
        ...base,
        typePost: DomainPostType.QUOTE,
        text: post.text as string,
        author: post.author as string,
        originalAuthorId: undefined,
        originalPostId: undefined,
      });

    case PostType.LINK:
      return new PostEntity({
        ...base,
        typePost: DomainPostType.LINK,
        link: post.link as string,
        description: post.description as string,
        originalAuthorId: undefined,
        originalPostId: undefined,
      });

    default:
      throw new Error('Invalid post type');
  }
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
          originalAuthorId: undefined,
          originalPostId: undefined,
        });
      case PostType.VIDEO:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.VIDEO,
          status: PostStatus.PUBLISHED,
          title: post.title as string,
          url: post.url as string,
          originalAuthorId: undefined,
          originalPostId: undefined,
        });
      case PostType.PHOTO:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.PHOTO,
          status: PostStatus.PUBLISHED,
          imageUrl: post.imageUrl as string,
          originalAuthorId: undefined,
          originalPostId: undefined,
        });
      case PostType.QUOTE:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.QUOTE,
          status: PostStatus.PUBLISHED,
          text: post.text as string,
          author: post.author as string,
          originalAuthorId: undefined,
          originalPostId: undefined,
        });

      case PostType.LINK:
        return new PostEntity({
          ...post,
          id: post.id.toString(),
          typePost: DomainPostType.LINK,
          status: PostStatus.PUBLISHED,
          link: post.link as string,
          description: post.description as string,
          originalAuthorId: undefined,
          originalPostId: undefined,
        });

      default:
        throw new Error('Invalid post type');
    }
  }
}
