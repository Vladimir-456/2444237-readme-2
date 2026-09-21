import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [PrismaClientModule],
  providers: [PostRepository, PostService],
  controllers: [PostController],
  exports: [PostRepository],
})
export class PostModule {}
