import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { access, mkdir, unlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

@Injectable()
export class FileStoreService {
  private readonly uploadDirectory = resolve(
    process.cwd(),
    'uploads',
    'avatars',
  );

  public async saveFile(file: Express.Multer.File, prefix: string) {
    await mkdir(this.uploadDirectory, { recursive: true });

    const extension = this.getSafeExtensions(file);

    const fileName = `${prefix}-${crypto.randomUUID()}.${extension}`;

    const filePath = join(this.uploadDirectory, fileName);

    try {
      (await file.buffer)
        ? this.writeBuffer(file.buffer, filePath)
        : this.copyDiskFile(file.path, filePath);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file');
    }
  }

  public async removeFile(filePath: string) {
    try {
      await unlink(filePath);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async exists(filepath: string): Promise<boolean> {
    try {
      await access(filepath);
      return true;
    } catch {
      return false;
    }
  }

  private createReadStream(filepath: string) {
    return createReadStream(filepath);
  }

  private getSafeExtensions(file: Express.Multer.File) {
    const extension = file.originalname.toLowerCase().split('.').pop();

    const allExtensions = ['jpg', 'jpeg', 'png'];

    if (!allExtensions.includes(extension as string)) {
      throw new BadRequestException('Invalid file extension');
    }

    return extension;
  }

  private async writeBuffer(buffer: Buffer, filePath: string) {
    const { writeFile } = await import('node:fs/promises');

    await writeFile(filePath, buffer);
  }

  private async copyDiskFile(path: string, filePath: string) {
    const { copyFile } = await import('node:fs/promises');

    await copyFile(path, filePath);
  }
}
