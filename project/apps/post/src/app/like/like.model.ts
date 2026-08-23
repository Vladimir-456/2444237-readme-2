import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'likes',
})
export class LikeModel {
  @Prop({ ref: 'posts', required: true })
  postId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  createdAt: Date;
}

export type LikeDocument = HydratedDocument<LikeModel>;

export const LikeSchema = SchemaFactory.createForClass(LikeModel);
