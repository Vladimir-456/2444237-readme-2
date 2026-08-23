import { BadRequestException, Injectable } from '@nestjs/common';
import { FileStoreService } from '../file-storage/file-store.service';

@Injectable()
export class AvatarService {
  constructor(private readonly fileStoreService: FileStoreService) {}
  async upload(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return await this.fileStoreService.saveFile(file, userId);
  }
}
