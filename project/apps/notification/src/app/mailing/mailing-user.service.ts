import { Model } from "mongoose";
import { MailingUsers, MailingUsersDocument } from "./schemas/mailing-users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

type MailingUserUpsert = {
    userId: string;
    email: string;
    name?: string;
    isActive: boolean;
}

@Injectable()
export class MailingUserService {
    constructor (
    @InjectModel(MailingUsers.name)
    private readonly mailingUserModel: Model<MailingUsersDocument>) 
    {}

    async createUser (dto: MailingUserUpsert) {
        await this.mailingUserModel.updateOne(
            {userId: dto.userId},
        {
                $set: {
                    email: dto.email,
                    name: dto.name,
                    isActive: dto.isActive,
                },
           $setOnInsert: {
            userId: dto.userId,
            },
        },
        { upsert: true },
    )
    }

    async getAllActiveUsers () {
        return this.mailingUserModel.find({
            isActive: true
        }).select('userId email name')
    }
}