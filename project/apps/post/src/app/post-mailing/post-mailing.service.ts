import { Injectable } from "@nestjs/common";
import { PostMailingRepository } from "./post-mailing.repository";

@Injectable()
export class PostMailingService {
    constructor (private readonly postMailingRepository: PostMailingRepository) {}
    async create (userId: string) {
        return this.postMailingRepository.createAndSendDigest(userId)
    }
}