import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MailingDeliveryStatus = 'sent' | 'pending' | 'failed'

@Schema({
    collection: 'mailing_deliveries',
    timestamps: true
})
export class MailingDelivery {
    @Prop({
        required: true
    })
    mailingId: string;
    @Prop({
        required: true
    })
    userId: string;
    @Prop({
        required: true
    })
    email: string;
    @Prop({
        required: true,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending',
    })
    status: MailingDeliveryStatus;
    @Prop()
    attempts: number;
    @Prop()
    lastError: string;
    @Prop()
    nextAttemptAt?: Date;
    @Prop()
    sentAt?: Date;
}

export const MailingDeliverySchema = SchemaFactory.createForClass(MailingDelivery)

MailingDeliverySchema.index(
  { mailingId: 1, userId: 1 },
  { unique: true },
);

export type MailingDeliveryDocument = HydratedDocument<MailingDelivery>;