export enum PostType {
  VIDEO = 'video',
  TEXT = 'text',
  PHOTO = 'photo',
  QUOTE = 'quote',
  LINK = 'link',
}

export enum PostStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

interface BasePost {
  id: string;
  authorId: string;
  tags: string[];
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  publishDate: Date;
  isRepost: boolean;
}

export interface VideoPost extends BasePost {
  type: PostType.VIDEO;
  title: string;
  link: string;
}

export interface TextPost extends BasePost {
  type: PostType.TEXT;
  title: string;
  preview: string;
  text: string;
}

export interface QuotePost extends BasePost {
  type: PostType.QUOTE;
  text: string;
  author: string;
}

export interface PhotoPost extends BasePost {
  type: PostType.PHOTO;
  imageUrl: string;
}

export interface LinkPost extends BasePost {
  type: PostType.LINK;
  link: string;
  description: string;
}

export type PostInterface =
  | VideoPost
  | TextPost
  | PhotoPost
  | QuotePost
  | LinkPost;
