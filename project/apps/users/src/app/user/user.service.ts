import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor (private readonly userRepository: UserRepository) {}

    async updateAvatar(userId: string, avatarPath: string) {
        return this.userRepository.updateUserAvatar(userId, avatarPath)
    }

    async getUser (userId: string | string[]) {
        if (typeof userId === 'string') {
            return await this.userRepository.findById(userId)
        }
        return await this.userRepository.findByIds(userId)
    }

}