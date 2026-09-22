export type PrismaDelegate = {
  findUnique: (...args: any[]) => Promise<any>;
  upsert: (...args: any[]) => Promise<any>;
  update: (...args: any[]) => Promise<any>;
  delete: (...args: any[]) => Promise<any>;
};

export type MethodArgs<
  TDelegate extends PrismaDelegate,
  TMethod extends keyof TDelegate,
> = TDelegate[TMethod] extends (...args: infer TArgs) => any ? TArgs : never;

export type MethodResult<
  TDelegate extends PrismaDelegate,
  TMethod extends keyof TDelegate,
> = TDelegate[TMethod] extends (...args: any[]) => Promise<infer TResult>
  ? TResult
  : never;
