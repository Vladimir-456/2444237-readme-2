import { MongoRepository } from '@project/core';
import { PostEntity } from './post.entity';
import { BasePostModel, PostDocument } from './post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class PostRepository extends MongoRepository<PostEntity, PostDocument> {
  constructor(
    @InjectModel(BasePostModel.name)
    protected readonly model: Model<PostDocument>,
  ) {
    super(model, PostEntity.fromObject);
  }
  async create(post: PostEntity): Promise<PostEntity> {
    return this.save(post);
  }

  async deletePost(id: string): Promise<void> {
    this.delete(id);
  }

  async findAll() {
    return this.model.find().exec();
  }
}
