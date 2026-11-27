import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { fillDTO } from '@project/helpers';
import { CurrentUser, ParseMongoIdPipe } from '@project/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDTO, CreateUserRdo, LoginUserRdo, RequestWithUser, ResetPasswordDto, TokenPayload, UserInterface } from '@project/shared-types';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Request } from 'express'


@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,  
    private readonly notifyService: NotifyService,
  ) {}

  @Post('/register')
  async register(@Body() dto: CreateUserDTO) {
    const newUser = await this.authenticationService.register(dto);

    const { email, name } = newUser

    await this.notifyService.registerNewUser({
      userId: newUser.id,
      email,
      name,
    })

    return fillDTO(CreateUserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Req() {user} : RequestWithUser) {
    const userToken = await this.authenticationService.createUserToken(user)

    return fillDTO(LoginUserRdo, {...user, ...userToken});
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id', new ParseMongoIdPipe()) id: string) {
    console.log('error!!!')
    const user = await this.authenticationService.getUser(id);

    if (!user) throw new NotFoundException('User not found');

    return fillDTO(CreateUserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reset')
  async resetPassword (@CurrentUser() user: TokenPayload, @Body() dto: ResetPasswordDto) {
    return this.authenticationService.resetPassword(user, dto.currentPassword, dto.newPassword)
  }

  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken (@Req() { user }: RequestWithUser) {
    return this.authenticationService.createUserToken(user)
  }


  @UseGuards(JwtAuthGuard)
  @Post('check')
  async checkAuth (@Req() req: Request) {
    return await this.authenticationService.checkUserToken(req)
  }

}
