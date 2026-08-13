import { Expose } from 'class-transformer';

export class CommentRDO {
  @Expose()
  id!: string;
  @Expose()
  text!: string;
  @Expose()
  authorId!: string;
  @Expose()
  postId!: string;
  @Expose()
  createdAt!: Date;
}
