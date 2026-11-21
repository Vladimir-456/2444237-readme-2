import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StringValue } from 'ms';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserInterface, TokenPayload, Token, LoginUserDTO, CreateUserDTO } from '@project/shared-types';
import { jwtConfig } from '@project/config-users';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh/refresh.service';
import { createJwtPayload } from '@project/helpers';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async register(userData: CreateUserDTO) {
    const { email, password, name, avatar } = userData;

    const user = {
      email,
      password,
      name,
      avatar,
    };

    const findUser = await this.userRepository.findByEmail(userData.email);

    if (findUser) {
      throw new ConflictException('User already exists');
    }

    const userEntity = await new UserEntity({
      ...user,
      id: crypto.randomUUID(),
    }).setPassword(password);

    const created = await this.userRepository.save(userEntity)

    return created.toPOJO()
  }

  public async resetPassword (user: TokenPayload, currentPassword: string, newPassword: string) {
    if (!user) {
      throw new UnauthorizedException('Missing token')
    }

    const userEntity = await this.userRepository.findByEmail(user.email)

    if (!userEntity) {
      throw new NotFoundException('User not found!')
    }

    const isCurrentPasswordValid = await userEntity.comparePassword(currentPassword)

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const isSamePassword = await userEntity.comparePassword(newPassword)

    if (isSamePassword) {
      throw new BadRequestException('Password is current!')
    }

    const updatedUser = await userEntity.setPassword(newPassword)
    const isUpdated = await this.userRepository.updatePassword(
      userEntity.id,
      updatedUser.password
    );

    if (!isUpdated) {
      throw new NotFoundException('User not found');
    }

    await this.refreshTokenService.revokeAllTokensForUser(userEntity.id)

    return { message: 'Password updated' };
  }

  public async checkUserToken (req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token')
    }

    try {
      const token = authHeader.replace('Bearer ', '').trim();

      return this.jwtService.verifyAsync(token, {
        secret: this.jwtOptions.accessTokenSecret,
      })

    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }

  public async createUserToken (user: UserInterface) : Promise<Token> {
    const payload = createJwtPayload(user)
    const refreshTokenPayload = { ...payload, tokenId: crypto.randomUUID() };

    try {
      const accessToken = await this.generateAccessToken(payload)
      const refreshToken = await this.generateRefreshToken(refreshTokenPayload)

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

      return { accessToken, refreshToken }
    }
    catch(error) {
      console.log(error)
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async generateAccessToken (payload: TokenPayload) {
    return this.jwtService.signAsync(payload)
  }

  public async generateRefreshToken (payload: TokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtOptions.refreshTokenSecret,
      expiresIn: this.jwtOptions.refreshExpiresIn as StringValue
    })
  }

  public async verify({ email, password }: LoginUserDTO) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    if (!(await existUser.comparePassword(password))) {
      throw new ConflictException('Invalid password');
    }
    return existUser.toPOJO();
  }

  public async getUser(id: string) {
    const result = await this.userRepository.getUserById(id);
    return result
  }
}
