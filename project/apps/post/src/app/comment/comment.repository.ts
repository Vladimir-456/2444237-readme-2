import { MongoRepository } from '@project/core';
import { CommentEntity } from './comment.entity';
import { CommentDocument } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentModel } from './comment.model';

export class CommentRepository extends MongoRepository<
  CommentEntity,
  CommentDocument
> {
  constructor(
    @InjectModel(CommentModel.name)
    protected readonly model: Model<CommentDocument>,
  ) {
    super(model, CommentEntity.fromObject);
  }
  async createComment(comment: CommentEntity) {
    return this.save(comment);
  }

  async deleteComment(id: string) {
    return this.delete(id);
  }

  async getComments(postId: string) {
    return this.model.find({ postId }).exec();
  }
}
