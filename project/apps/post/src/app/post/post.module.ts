import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {
  PostSchema,
  BasePostModel,
  VideoPostSchema,
  TextPostSchema,
  QuotePostSchema,
  PhotoPostSchema,
  LinkPostSchema,
  LinkPostModel,
  VideoPostModel,
  QuotePostModel,
  TextPostModel,
  PhotoPostModel,
} from './post.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PostType } from '@project/shared-types';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [
    PrismaClientModule,
    // MongooseModule.forFeature([
    //   {
    //     name: BasePostModel.name,
    //     schema: PostSchema,
    //     discriminators: [
    //       { name: PostType.QUOTE, schema: QuotePostSchema },
    //       { name: PostType.TEXT, schema: TextPostSchema },
    //       { name: PostType.PHOTO, schema: PhotoPostSchema },
    //       { name: PostType.VIDEO, schema: VideoPostSchema },
    //       { name: PostType.LINK, schema: LinkPostSchema },
    //     ],
    //   },
    // ]),
  ],
  providers: [PostRepository, PostService],
  controllers: [PostController],
  exports: [PostRepository],
})
export class PostModule {}
