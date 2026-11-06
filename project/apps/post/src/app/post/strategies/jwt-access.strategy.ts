import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '@project/shared-types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(
        'jwt.accessTokenSecret',
      ),
    });
  }

  public validate(payload: TokenPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}