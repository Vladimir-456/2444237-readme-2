import { PostStatus, PostType } from '@project/shared-types';
import { Expose } from 'class-transformer';

export class CreatePostRDO {
  @Expose()
  id!: string;

  @Expose()
  authorId!: string;

  @Expose()
  type!: PostType;

  @Expose()
  status!: PostStatus;

  createdAt!: Date;

  updatedAt!: Date;

  @Expose()
  tags!: string[];

  @Expose()
  title?: string;

  @Expose()
  link?: string;

  @Expose()
  preview?: string;

  @Expose()
  text?: string;

  @Expose()
  author?: string;

  @Expose()
  imageUrl?: string;

  @Expose()
  description?: string;
}
