import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { getJWTOptions } from '@project/config-users'
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenModule } from '../refresh/refresh.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule, 
    NotifyModule, 
    RefreshTokenModule, 
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtRefreshStrategy, JwtAccessStrategy, LocalStrategy],
})
export class AuthenticationModule {}
