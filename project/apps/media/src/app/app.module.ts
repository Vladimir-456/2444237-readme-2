import { Module } from '@nestjs/common';
import { AvatarModule } from './avatar/avatar.module';
import { FileStorageModule } from './file-storage/file-storage.module';

@Module({
  imports: [AvatarModule, FileStorageModule],
})
export class AppModule {}
