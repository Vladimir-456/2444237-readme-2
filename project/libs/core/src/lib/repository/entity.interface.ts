export type EntityId = string;

export interface Entity<T extends EntityId, DataType> {
  id: T;
  toPOJO(): DataType;
}
