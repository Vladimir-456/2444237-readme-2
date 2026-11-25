import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import FormData from 'form-data';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';
import { memoryStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';

import {
  CreateUserDTO,
  CreateUserRdo,
  GetUserResponseDto,
  LoginUserDTO,
  LoginUserRdo,
  RefreshRdo,
  RequestWithUser,
  ResetPasswordDto,
} from '@project/shared-types';
import axios from 'axios';

@UseFilters(AxiosExceptionFilter)
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно зарегистрирован',
    type: CreateUserRdo,
  })
  @Post('register')
  async register(@Body() dto: CreateUserDTO) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,
      dto,
    );

    return data;
  }

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно аутентифицирован',
    type: LoginUserRdo,
  })
  @Post('login')
  async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/login`,
      dto,
    );

    return data;
  }

  @ApiOperation({ summary: 'Сброс пароля пользователя' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пароль успешно изменён',
  })
  @UseGuards(JwtAuthGuard, CheckAuthGuard)
  @Post('reset')
  async resetPassword(
    @Req() req: Request,
    @Body() dto: ResetPasswordDto,
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/reset`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

  @ApiOperation({ summary: 'Подписка на пользователя' })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
    type: String,
    required: true,
    example: '6ad1c41523ca94e2b3fb76b3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Подписка успешно оформлена',
  })
  @UseGuards(JwtAuthGuard, CheckAuthGuard)
  @Post(':id/subscribe')
  async subscribe(
    @Param('id') userId: string,
    @Req() req: Request,
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.User}/${userId}/subscribe`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

  @ApiOperation({ summary: 'Обновление пары токенов' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Новая пара access и refresh токенов',
    type: RefreshRdo,
  })
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      },
    );

    return data;
  }

  @ApiOperation({ summary: 'Проверка access token' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access token действителен',
  })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  async checkToken(
    @Req() { user: payload }: RequestWithUser,
  ) {
    return payload;
  }

  @ApiOperation({ summary: 'Загрузка аватара пользователя' })
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
    type: String,
    required: true,
    example: '6ad1c41523ca94e2b3fb76b3',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor(
    'file', {
      storage: memoryStorage(),
       limits: {
          fileSize: 5 * 1024,
          files: 1,
        },
    }
  ))
  @Post(':id/avatar')
  async uploadAvatar(
    @Req() req: Request,
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
) {

    if (!file) {
      throw new BadRequestException('Файл не передан');
    }

    const form = new FormData()

    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    })

    const { data: uploadedFile } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Avatar}/${userId}/avatar`,form, {
        headers: {
          ...form.getHeaders(),
          Authorization: req.headers.authorization
        }
      }
    );

    try {
  const { data: updatedUser } = await this.httpService.axiosRef.patch(
    `${ApplicationServiceURL.User}/${userId}/avatar`,
    {
      avatarPath: uploadedFile.avatarPath,
    },
    {
      headers: {
        Authorization: req.headers.authorization,
      },
    },
  );

  return updatedUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('USERS SERVICE ERROR:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });

      const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data;

      throw new HttpException(
        data?.message ?? 'Не удалось обновить аватар пользователя',
        status,
      );
    }
    
    throw error;
  }
  }

  @ApiOperation({
    summary: 'Получить публичный профиль пользователя',
    description:
      'Возвращает данные пользователя, количество публикаций и подписчиков.',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    description: 'Уникальный идентификатор пользователя',
    type: String,
    required: true,
    example: '6ad1c41523ca94e2b3fb76b3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Профиль пользователя получен',
    type: GetUserResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(
    @Req() req: Request,
    @Param('id') userId: string,
  ): Promise<GetUserResponseDto> {
    const [user, posts, subscribers] = await Promise.all([
      this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Auth}/${userId}`,
        {
          headers: {
            Authorization: req.headers['authorization'],
          },
        },
      ),
      this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Post}/${userId}/count`,
        {
          headers: {
            Authorization: req.headers['authorization'],
          },
        },
      ),
      this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Subscribers}/${userId}/count`,
      ),
    ]);

    return {
      id: user.data.id,
      registeredAt: user.data.createdAt,
      postsCount: posts.data.postsCount,
      subscribersCount: subscribers.data,
    };
  }
}