import { Module } from '@nestjs/common';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarController } from './avatar/avatar.controller';

@Module({
  imports: [AvatarModule],
  providers: [AvatarModule],
  controllers: [],
})
export class AppModule {}
