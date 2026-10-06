import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { fillDTO } from '@project/helpers';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseMongoIdPipe } from '@project/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя'})
  @ApiResponse({ status: 201, type: CreateUserRdo })
  @Post('/register')
  async register(@Body() dto: CreateUserDTO) {
    const newUser = await this.authenticationService.register(dto);
    return fillDTO(CreateUserRdo, newUser);
  }

  @ApiOperation({ summary: 'Вход в систему'})
  @ApiResponse({ status: 200, type: LoginUserRdo })
  @Post('/login')
  async login(@Body() dto: LoginUserDTO) {
    const user = await this.authenticationService.verify(dto);
    const userToken = await this.authenticationService.createUserToken(user)

    return fillDTO(LoginUserRdo, {...user, ...userToken});
  }

  @ApiOperation({ summary: 'Получение информации о пользователе'})
  @ApiBearerAuth('acess-token')
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: CreateUserRdo })
  @Get(':id')
  async getUser(@Param('id', new ParseMongoIdPipe()) id: string) {
    const user = await this.authenticationService.getUser(id);

    if (!user) throw new NotFoundException('User not found');

    return fillDTO(CreateUserRdo, user);
  }
}
