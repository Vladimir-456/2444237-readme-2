import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'comments',
})
export class CommentModel {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  authorId: string;
  @Prop({ ref: 'posts', required: true })
  postId: string;
  @Prop({ required: true })
  createdAt: Date;
}

export type CommentDocument = HydratedDocument<CommentModel>;

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
