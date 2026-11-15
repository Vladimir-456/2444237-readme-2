import { Body, Controller, Get, Param, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { LoginUserDTO } from "./dto/login-user.dto";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { Request } from 'express'
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { RequestWithUser } from '@project/shared-types';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@UseFilters(AxiosExceptionFilter)
@Controller('users')
export class UsersController {
    constructor (
        private readonly httpService: HttpService
    ) {}

    // @Post('register')
    // async register (@Body())
    
    @Post('login')
    async login (@Body() dto: LoginUserDTO) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, {...dto})
        return data
    }

    @Post('refresh')
    async refresh (@Req() req: Request) {
        const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`,null, {
            headers: {
                'Authorization': req.headers['authorization']
            }
        })

        return data
    }

    @UseGuards(JwtAuthGuard)
    @Post('check')
    async checkToken (@Req() {user: payload} : RequestWithUser) {
        return payload
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser (
        @Req() req: Request,
        @Param('id') user_id: string
    ) {
        const [user, posts, subscribers] = await Promise.all([
            this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${user_id}`, {
            headers: {
                'Authorization': req.headers['authorization']
            }
            }),
            this.httpService.axiosRef.get(`${ApplicationServiceURL.Post}/${user_id}/count`, {
                headers: {
                'Authorization': req.headers['authorization']
            }
            }),
            this.httpService.axiosRef.get(`${ApplicationServiceURL.Subscribers}/${user_id}/count`)
        ])

        console.log(user.data)
        console.log(posts.data)
        console.log(subscribers.data)

        return {
            id: user.data.id,
            registeredAt: user.data.createdAt,
            postsCount: posts.data.postsCount,
            subscribersCount: subscribers.data,
        }

    }
}