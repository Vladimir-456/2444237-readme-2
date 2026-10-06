import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { getJWTOptions } from '@project/config-users'
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTOptions
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
})
export class AuthenticationModule {}
