import { Entity, EntityId } from './entity.interface';
import {
  MethodArgs,
  MethodResult,
  PrismaDelegate,
} from './prisma.repository.interface';
import { Repository } from './repository.interface';

export class PrismaRepository<
  T extends Entity<EntityId, TData>,
  TDelegate extends PrismaDelegate,
  TData = object,
> implements Repository<T>
{
  protected constructor(
    protected readonly model: TDelegate,
    private readonly createEntity: (
      data: NonNullable<MethodResult<TDelegate, 'findUnique'>>,
    ) => T,
  ) {}

  async findById(id: T['id']): Promise<T | null> {
    const args = {
      where: { id },
    } as unknown as MethodArgs<TDelegate, 'findUnique'>;
    const element = await this.model.findUnique(args);
    return element ? this.createEntity(element) : null;
  }

  async save(entity: T): Promise<T> {
    const data = entity.toPOJO();

    const newElement = await this.model.upsert({
      where: { id: entity.id },
      update: data,
      create: data,
    } as unknown as MethodArgs<TDelegate, 'upsert'>);
    return this.createEntity(newElement);
  }

  async update(id: T['id'], entity: T): Promise<T> {
    const data = entity.toPOJO();

    const updatedElement = await this.model.update({
      where: { id },
      data: data,
    } as unknown as MethodArgs<TDelegate, 'update'>);
    return this.createEntity(updatedElement);
  }

  async delete(id: T['id']): Promise<void> {
    const args = {
      where: { id },
    } as unknown as MethodArgs<TDelegate, 'upsert'>;
    await this.model.delete(args);
  }
}
