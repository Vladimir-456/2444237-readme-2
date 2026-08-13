import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { fillDTO } from '@project/helpers';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiResponse({ type: CreateUserRdo })
  @Post('/register')
  async register(@Body() dto: CreateUserDTO) {
    const newUser = await this.authenticationService.register(dto);
    return fillDTO(CreateUserRdo, newUser);
  }

  @ApiResponse({ type: LoginUserRdo })
  @Post('/login')
  async login(@Body() dto: LoginUserDTO) {
    const user = await this.authenticationService.verify(dto);
    return fillDTO(LoginUserRdo, user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.authenticationService.getUser(id);

    if (!user) throw new NotFoundException('User not found');

    return fillDTO(CreateUserRdo, user);
  }
}
