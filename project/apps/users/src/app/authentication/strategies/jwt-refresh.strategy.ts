import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConfig } from "@project/config-users";
import { RefreshTokenPayload } from "@project/shared-types";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticationService } from "../authentication.service";
import { RefreshTokenService } from "../../refresh/refresh.service";
import { TokenNotExistsException } from "../exceptions/token-not-exists.exception";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor (
        private readonly authService: AuthenticationService,
        private readonly refreshTokenService: RefreshTokenService,
        @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtOptions.refreshTokenSecret
        })
    }

    async validate (payload: RefreshTokenPayload) {
        if (!await this.refreshTokenService.isExists(payload.tokenId)) {
            throw new TokenNotExistsException(payload.tokenId)
        }

        await this.refreshTokenService.deleteRefreshSession(payload.tokenId)
        await this.refreshTokenService.deleteExpiredRefreshTokens()

        return this.authService.getUserByEmail(payload.email)
    }
}