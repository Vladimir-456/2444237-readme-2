import { CommentInterface } from './comments.interface';

export enum PostType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  PHOTO = 'PHOTO',
  QUOTE = 'QUOTE',
  LINK = 'LINK',
}

export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
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
  comments?: CommentInterface[];
}

export interface VideoPost extends BasePost {
  typePost: PostType.VIDEO;
  title: string;
  url: string;
}

export interface TextPost extends BasePost {
  typePost: PostType.TEXT;
  title: string;
  preview: string;
  text: string;
}

export interface QuotePost extends BasePost {
  typePost: PostType.QUOTE;
  text: string;
  author: string;
}

export interface PhotoPost extends BasePost {
  typePost: PostType.PHOTO;
  imageUrl: string;
}

export interface LinkPost extends BasePost {
  typePost: PostType.LINK;
  link: string;
  description: string;
}

export type PostInterface =
  | VideoPost
  | TextPost
  | PhotoPost
  | QuotePost
  | LinkPost;
