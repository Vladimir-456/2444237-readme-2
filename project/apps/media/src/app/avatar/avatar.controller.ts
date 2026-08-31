import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AvatarService } from './avatar.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ParseMongoIdPipe } from '@project/core';

@ApiTags('users')
@Controller()
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  @ApiResponse({ status: 201 })
  @Post('users/:userId/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  public uploadAvatar(
    @Param('userId', new ParseMongoIdPipe()) userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.avatarService.upload(file, userId);
  }
}
