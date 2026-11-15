import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from 'express'

export interface CurrentUserPayload {
    id: string;
    email: string;
    name: string;
}

export const CurrentUser = createParamDecorator(
  (
    data: keyof CurrentUserPayload | undefined,
    ctx: ExecutionContext,
  ): CurrentUserPayload | string | undefined => {
    const request = ctx.switchToHttp().getRequest();

    return {
      id: request.user.id,
      email: request.user.email,
      name: request.user.name
    }
  },
);