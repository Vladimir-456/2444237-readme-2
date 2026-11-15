import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { RequestWithUser } from "@project/shared-types";

@Injectable()
export class UserIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        if (!req.user) {
            throw new UnauthorizedException('User not found')
        }
        
        req.body['authorId'] = req.user.id;
        req.headers['x-user-id'] = req.user.id;

        return next.handle()
    }
}