import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { AvatarService } from './avatar.service';

@Module({
  imports: [FileStorageModule],
  providers: [AvatarService],
  exports: [AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
