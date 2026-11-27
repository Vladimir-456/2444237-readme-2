import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { NotifyService } from "../notify/notify.service";
import { CurrentUser, CurrentUserPayload, ParseMongoIdPipe } from '@project/core'
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { UpdateAvatarDto } from "./dto/update-avatar.dto";
import { fillDTO } from "@project/helpers";
import { UpdateAvatarRdo } from "./dto/update-avatar.rdo";

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
        return this.userService.getUser(userIds);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/avatar')
    async updateAvatar (
        @Param('id', ParseMongoIdPipe) userId: string,
        @Body() dto: UpdateAvatarDto,
    ) {
        const updatedUser = await this.userService.updateAvatar(userId, dto.avatarPath);
        return fillDTO(UpdateAvatarRdo, updatedUser)
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