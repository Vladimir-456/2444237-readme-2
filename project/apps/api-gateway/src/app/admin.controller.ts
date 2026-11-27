import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { Request } from  'express';
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostMailingRdo } from "@project/shared-types";

@ApiTags('Админ')
@Controller('admin/post-mailing')
export class AdminController {
    constructor (
            private readonly httpService: HttpService
        ) {}
   @ApiResponse({
     status: 201,
     type: PostMailingRdo
   })     
  @ApiOperation({
        summary: 'Запуск рассылки',
        description: 'Запускает рассылку постов',
    })         
  @UseGuards(JwtAuthGuard, CheckAuthGuard)
  @Post('')
  async createPostMailing (
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Admin}/post-mailing`, null, {
            headers: {
                Authorization: req.headers['authorization']
            }})

    return data
  }
}