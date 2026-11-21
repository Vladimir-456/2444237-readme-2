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

  public async getUserById (id: string) {
    return this.model.findOne({_id: id}, {
      id: 1,
      createdAt: 1,
      email: 1,
      name: 1
    })
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return document ? this.createDocument(document) : null;
  }

  public async updatePassword(userId: string, passwordHash: string) {
    const result = await this.model.updateOne(
      {_id: userId},
      {
        $set: {
          password: passwordHash
        }
      }
    ).exec()

    return result.modifiedCount > 0;
  }

  async findByIds (userIds: string[]) {
    const documents = await this.model.find(
      {_id: {$in: userIds}},
      {
        id: 1,
        createdAt: 1,
        email: 1,
        name: 1,
      },
    )
    return documents.map((document) => this.createDocument(document))
  }
}
