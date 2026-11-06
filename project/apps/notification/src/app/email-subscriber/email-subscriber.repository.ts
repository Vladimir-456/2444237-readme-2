import { MongoRepository } from '@project/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberDocument, EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';
import { EmailSubscriberDto } from './dto/email-subscriber.dto';

export class EmailSubscriberRepository extends MongoRepository<EmailSubscriberEntity, EmailSubscriberDocument> {
    constructor(@InjectModel(EmailSubscriberModel.name) protected readonly model: Model<EmailSubscriberDocument>) {
        super(model, EmailSubscriberEntity.fromObject)
    }

    async findByEmail(email: string) {
        const document = await this.model
            .findOne({ email })
            .exec();

        return this.createDocument(document);
        }
    
    async create(dto: EmailSubscriberDto) {
        const document = await this.model.create(dto)

        return this.createDocument(document)
    }

    async findByAuthorId(authorId: string): Promise<EmailSubscriberDocument[]> {
    return this.model
        .find({ authorId })
        .exec();
    }
}