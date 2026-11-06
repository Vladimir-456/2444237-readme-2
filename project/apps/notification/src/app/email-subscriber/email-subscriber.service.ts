import { Injectable } from "@nestjs/common";
import { EmailSubscriberDto } from "./dto/email-subscriber.dto";
import { EmailSubscriberRepository } from "./email-subscriber.repository";
import { Subscriber } from "@project/shared-types";

@Injectable()
export class EmailSubscriberService {
    constructor(
        private readonly emailSubscriberRepository: EmailSubscriberRepository,
    ) {}
    async addSubscriber (subscriber: EmailSubscriberDto) {
        const { email } = subscriber
        const existSubscriber = await this.emailSubscriberRepository.findByEmail(email)

        if (existSubscriber) {
            return existSubscriber
        }

        return this.emailSubscriberRepository.create(subscriber)
    }

    async findByAuthorId(authorId: string): Promise<Subscriber[]> {
        return this.emailSubscriberRepository.findByAuthorId(authorId);
    }
}