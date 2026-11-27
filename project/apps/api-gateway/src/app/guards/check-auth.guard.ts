import { HttpService } from "@nestjs/axios";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ApplicationServiceURL } from "../app.config";
import { Request } from 'express'

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor (
        private readonly httpService: HttpService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authorization = request.headers['authorization']

        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing')
        }

        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/check`, null, {
                headers: {
                    'Authorization': request.headers['authorization']
            }
        })

        request['user'] = data

        return true
      
    }
}