import { Model } from "mongoose";
import { RefreshToken } from "./refresh.model";
import { InjectModel } from "@nestjs/mongoose";
import { MongoRepository } from "@project/core";
import { RefreshTokenEntity } from "./refresh.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenRepository extends MongoRepository<RefreshTokenEntity, RefreshToken>{
    constructor (
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>
    ) {
        super(refreshTokenModel, RefreshTokenEntity.fromObject);
    }

    public async deleteByTokenId (tokenId: string) {
        return this.model.deleteOne({ tokenId }).exec()
    }

    public async findByTokenId(tokenId: string) {
        return this.model.findOne({ tokenId })
    } 

    public revokeAllTokensForUser(userId: string) {
        return this.model.deleteMany({
            userId: userId
        })
    }

    public async deleteExpiredTokens() {
        return this.model.deleteMany( {expiresIn: {$lt: new Date()}})
    }

    public async create(entity: RefreshTokenEntity) {
        return this.model.create({
            tokenId: entity.tokenId,
            userId: entity.userId,
            createdAt: entity.createdAt,
            expiresIn: entity.expiresIn,
        })
    }
}