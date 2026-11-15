import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios'
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTOptions, jwtConfig } from '@project/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { PostController } from './post.controller';
import { CommentsController } from './comments.controller';
import { LikesController } from './likes.controller';
@Module({
  imports: 
  [JwtModule.registerAsync(
  {inject: [ConfigService],useFactory: getJWTOptions}),
  HttpModule.register({
    timeout: HTTP_CLIENT_TIMEOUT,
    maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [jwtConfig],
    envFilePath: 'apps/api-gateway/api-gateway.env',
  })],
  controllers: [UsersController, PostController, CommentsController, LikesController],
  providers: [JwtAccessStrategy, CheckAuthGuard],
})
export class AppModule {}
