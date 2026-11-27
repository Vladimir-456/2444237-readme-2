import { Inject, Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "./refresh.repository";
import { jwtConfig } from "@project/config-users";
import { ConfigType } from "@nestjs/config";
import { RefreshTokenPayload } from "@project/shared-types";
import { parseTime } from "@project/helpers";
import { RefreshTokenEntity } from "./refresh.entity";
import dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
    constructor (
        private readonly refreshTokenRepository: RefreshTokenRepository,
        @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    ) {}

    async createRefreshSession (payload: RefreshTokenPayload) {
        const timeValue = parseTime(this.jwtOptions.refreshExpiresIn)
        const refreshToken = new RefreshTokenEntity({
            tokenId: payload.tokenId,
            createdAt: new Date(),
            userId: payload.id,
            expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
        })

        const result = await this.refreshTokenRepository.create(refreshToken)

        return result
    }

    public revokeAllTokensForUser(userId: string) {
        return this.refreshTokenRepository.revokeAllTokensForUser(userId)
    }

    public async isExists (tokenId: string) {
        const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId)

        return (refreshToken !== null);
    }
    
    public async deleteRefreshSession(tokenId: string) {
        await this.deleteExpiredRefreshTokens();
        return this.refreshTokenRepository.deleteByTokenId(tokenId)
    }

    public async deleteExpiredRefreshTokens() {
        return this.refreshTokenRepository.deleteExpiredTokens();
  }
}