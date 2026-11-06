import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
  collection: 'mailing_users',
  timestamps: true,
})
export class MailingUsers {
  @Prop({ required: true, unique: true,
  index: true,})
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  name?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const MailingUsersSchema = SchemaFactory.createForClass(MailingUsers)

export type MailingUsersDocument = HydratedDocument<MailingUsers>