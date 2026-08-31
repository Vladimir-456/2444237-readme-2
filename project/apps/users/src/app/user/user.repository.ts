import { MongoRepository } from '@project/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDocument, UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends MongoRepository<UserEntity, UserDocument> {
  constructor(
    @InjectModel(UserModel.name) protected readonly model: Model<UserDocument>,
  ) {
    super(model, UserEntity.fromObject);
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return document ? this.createDocument(document) : null;
  }
}
