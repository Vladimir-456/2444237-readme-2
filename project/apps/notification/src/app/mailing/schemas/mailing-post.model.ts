import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
    collection: 'mailing_posts',
    timestamps: true
})
export class MailingPost {
  @Prop()
  mailingId: string;
  @Prop({
    required: true
  })
  postId: string
  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  url?: string;

  @Prop({ required: true })
  publishDate: Date;

  @Prop({ default: 0 })
  position: number;
}

export const MailingPostSchema = SchemaFactory.createForClass(MailingPost)

MailingPostSchema.index(
    {mailingId: 1, postId: 1},
    {unique: true}
)

export type MailingPostDocument = HydratedDocument<MailingPost>;