import { Entity, EntityId } from './entity.interface';
import { Repository } from './repository.interface';
import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class MongoRepository<
  T extends Entity<EntityId, TData>,
  DocumentType extends Document,
  TData = object,
> implements Repository<T>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (data: DocumentType) => T,
  ) {}

  protected createDocument(document: DocumentType | null): T | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }

  async findById(id: T['id']): Promise<T | null> {
    const document = await this.model.findById(id).exec();

    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject());
  }

  async save(entity: T): Promise<T> {
    const document = await this.model.create(entity.toPOJO() as any);
    return this.createEntity(document.toObject());
  }

  public async update(id: T['id'], entity: T): Promise<T> {
    const data = entity.toPOJO() as any;
    const updatedDocument = await this.model
      .findOneAndUpdate(
        {
          _id: id,
          type: data.type,
        },
        {
          $set: data,
        },
        {
          returnDocument: 'after',
          runValidators: true,
        },
      )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${id} does not exist`);
    }

    return this.createEntity(updatedDocument.toObject());
  }

  async delete(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} does not exist`);
    }
  }
}
