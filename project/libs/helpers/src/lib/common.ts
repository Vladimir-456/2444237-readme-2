import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

type PlainObject = object;

export function fillDTO<T extends object>(
  DtoClasses: ClassConstructor<T>,
  plainObject: PlainObject,
  options?: ClassTransformOptions,
): T;

export function fillDTO<T extends object>(
  DtoClass: ClassConstructor<T>,
  plainObject: PlainObject[],
  options?: ClassTransformOptions,
): T[];

export function fillDTO<T extends object>(
  DtoClasses: ClassConstructor<T>,
  plainObject: PlainObject | PlainObject[],
  options?: ClassTransformOptions,
) {
  return plainToInstance(DtoClasses, plainObject, {
    ...options,
    excludeExtraneousValues: true,
  });
}
