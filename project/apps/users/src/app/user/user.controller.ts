import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { NotifyService } from "../notify/notify.service";
import { CurrentUser, CurrentUserPayload } from '@project/core'
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor (
        private readonly userService: UserService,
        private readonly notifyService: NotifyService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post(':authorId/subscribe')
    async subscribe(
    @Param('authorId') authorId: string,
    @CurrentUser() user: CurrentUserPayload,
    ) {
    await this.notifyService.registerSubscriber({
        email: user.email,
        name: user.name,
        authorId,
    });

    return { success: true };
    }
}