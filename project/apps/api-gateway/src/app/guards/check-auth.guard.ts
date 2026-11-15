import { HttpService } from "@nestjs/axios";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ApplicationServiceURL } from "../app.config";
import { Request } from 'express'

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor (
        private readonly httpService: HttpService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
             const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, null, {
                headers: {
                    'Authorization': request.headers['authorization']
            }
        })

        request['user'] = data

        return true
      
    }
}