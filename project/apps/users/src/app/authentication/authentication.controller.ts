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
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { fillDTO } from '@project/helpers';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, ParseMongoIdPipe } from '@project/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../user/user.entity';
import { RequestWithUser, TokenPayload, UserInterface } from '@project/shared-types';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Request } from 'express'
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,  
    private readonly notifyService: NotifyService,
  ) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя'})
  @ApiResponse({ status: 201, type: CreateUserRdo })
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
  @ApiOperation({ summary: 'Вход в систему'})
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: LoginUserRdo })
  @Post('/login')
  async login(@Req() {user} : RequestWithUser) {
    console.log(user)
    const userToken = await this.authenticationService.createUserToken(user)

    return fillDTO(LoginUserRdo, {...user, ...userToken});
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение информации о пользователе'})
  @ApiBearerAuth('acess-token')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserRdo })
  @Get(':id')
  async getUser(@Param('id', new ParseMongoIdPipe()) id: string) {
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
  @ApiOperation({ summary: 'Получение новой пары токенов'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  async refreshToken (@Req() { user }: RequestWithUser) {
    return this.authenticationService.createUserToken(user)
  }


  @Post('check')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check access token'
  })
  async checkAuth (@Req() req: Request) {
    return this.authenticationService.checkUserToken(req)
  }

}
