import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

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

export type DBConfig = {
  db: string;
  host: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
};


export function getMongoConnectString(config: DBConfig): string {
  return `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}?authSource=${config.authBase}`;
}

export function parseTime(time: string) {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error('Bad time string')
  }

  const [, valueRaw, unitRaw] = match
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function createJwtPayload (user: UserInterface) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar
  }
}
