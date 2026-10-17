import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Subscriber} from '@project/shared-types'
import { HydratedDocument } from 'mongoose';
@Schema({
    collection: 'email-subscribers',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements Subscriber {
    @Prop({
        required: true
    })
    public email: string;
    @Prop({
        required: true
    })
    public name: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
    })
    public authorId: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel)
export type EmailSubscriberDocument = HydratedDocument<EmailSubscriberModel, { id: string}>;