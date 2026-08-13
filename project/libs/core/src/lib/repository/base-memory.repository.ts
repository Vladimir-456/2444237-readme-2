import { randomUUID } from 'node:crypto';
import { Entity, EntityId } from './entity.interface';
import { Repository } from './repository.interface';

export class BaseMemoryRepository<T extends Entity<EntityId>>
  implements Repository<T>
{
  protected entities: Map<T['id'], T> = new Map();

  async findById(id: T['id']): Promise<T | null> {
    return this.entities.get(id) || null;
  }

  async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }
    this.entities.set(entity.id, entity);
    return entity;
  }

  public async update(id: T['id'], entity: T): Promise<T> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} does not exist`);
    }

    entity.id = id;
    this.entities.set(entity.id, entity);
    return entity;
  }

  async delete(id: T['id']): Promise<void> {
    this.entities.delete(id);
  }
}
