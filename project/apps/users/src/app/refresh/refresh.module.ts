import { Module } from "@nestjs/common";
import { RefreshTokenService } from "./refresh.service";
import { RefreshTokenRepository } from "./refresh.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from "./refresh.model";

@Module({
    imports: [MongooseModule.forFeature([
        { name: RefreshToken.name, schema: RefreshTokenSchema}
    ])],
    providers: [
        RefreshTokenService,
        RefreshTokenRepository
    ],
    exports: [RefreshTokenService],

})
export class RefreshTokenModule {}