import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt"
import { StringValue } from 'ms';

export async function getJWTOptions (configService: ConfigService) : Promise<JwtModuleOptions> {
    return {
        secret: configService.get<string>('jwt.accessTokenSecret'),
        signOptions: {
            expiresIn: configService.get<StringValue>('jwt.accessExpiresIn'),
            algorithm: 'HS256',
        }
    }
}