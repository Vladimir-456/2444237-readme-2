import { Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
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
    @Post('notifications/newsletter')
    async requestedNotifyLetter (
        @CurrentUser() user: CurrentUserPayload,
    ) {
        await this.notifyService.requestNotifyLetter(user)
    }

    @Get('bulk')
    async findByIds(
        @Query('ids') ids: string
    ) {
        const userIds = ids.split(',')
        console.log(userIds)
        return this.userService.getUser(userIds);
    }

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