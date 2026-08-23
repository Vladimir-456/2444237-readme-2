import { Module } from '@nestjs/common';
import { FileStoreService } from './file-store.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileStoreService],
  exports: [FileStoreService],
})
export class FileStorageModule {}
