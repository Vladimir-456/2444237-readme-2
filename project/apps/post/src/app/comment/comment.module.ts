import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PostModule } from '../post/post.module';
import { CommentModel, CommentSchema } from './comment.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [PrismaClientModule, PostModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule {}
