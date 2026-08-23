import { MongoRepository } from '@project/core';
import { LikeEntity } from './like.entity';
import { LikeDocument, LikeModel } from './like.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LikeRepository extends MongoRepository<LikeEntity, LikeDocument> {
  constructor(
    @InjectModel(LikeModel.name) protected readonly model: Model<LikeDocument>,
  ) {
    super(model, LikeEntity.fromObject);
  }
  create(like: LikeEntity): Promise<LikeEntity> {
    return this.save(like);
  }

  async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const document = await this.model.findOne({ userId, postId }).exec();
    return document ? this.createDocument(document) : null;
  }

  async deleteByUserAndPost(userId: string, postId: string): Promise<void> {
    const like = await this.findByUserAndPost(userId, postId);

    if (like?.id) {
      await this.delete(like.id);
    }
  }
}
