import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor (private readonly userRepository: UserRepository) {}

    async getUser (userId: string) {
        return await this.userRepository.findById(userId)
    }

}