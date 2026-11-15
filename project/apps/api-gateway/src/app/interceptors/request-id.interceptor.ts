import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express'

export class RequestIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestId = crypto.randomUUID()
        const req = context.switchToHttp().getRequest<Request>();

        req.headers['x-request-id'] = requestId;
        Logger.log(`[${req.method}: ${req.url}]: RequestId is ${requestId}`)
        return next.handle()
    }
}