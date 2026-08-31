import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostStatus, PostType } from '@project/shared-types';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  discriminatorKey: 'type',
  collection: 'posts',
})
export class BasePostModel {
  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  publishDate: Date;

  @Prop({ required: true, enum: PostStatus })
  status: string;

  @Prop({ required: true })
  isRepost: boolean;

  @Prop({ required: true })
  authorId: string;
}

@Schema()
export class LinkPostModel extends BasePostModel {
  @Prop({ required: true })
  link: string;

  @Prop({ required: false })
  description?: string;
}

export const LinkPostSchema = SchemaFactory.createForClass(LinkPostModel);

@Schema()
export class PhotoPostModel extends BasePostModel {
  @Prop({ required: true })
  imageUrl: string;
}

export const PhotoPostSchema = SchemaFactory.createForClass(PhotoPostModel);

@Schema()
export class VideoPostModel extends BasePostModel {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;
}

export const VideoPostSchema = SchemaFactory.createForClass(VideoPostModel);

@Schema()
export class TextPostModel extends BasePostModel {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  preview: string;
}

export const TextPostSchema = SchemaFactory.createForClass(TextPostModel);

@Schema()
export class QuotePostModel extends BasePostModel {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  author: string;
}

export const QuotePostSchema = SchemaFactory.createForClass(QuotePostModel);

export const PostSchema = SchemaFactory.createForClass(BasePostModel);

export type PostDocument = HydratedDocument<BasePostModel>;
