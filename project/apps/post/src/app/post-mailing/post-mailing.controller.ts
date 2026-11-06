import { Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser, CurrentUserPayload } from "@project/core";
import { PostMailingService } from "./post-mailing.service";
import { JwtAuthGuard } from "../post/guards/jwt-auth.guard";

@Controller('admin/post-mailing')
export class PostMailingController {
    constructor(private readonly postMailingService: PostMailingService) {}
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create (@CurrentUser() user: CurrentUserPayload) {
         return this.postMailingService.create(user.id)
    }
}