import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserInterface, TokenPayload, Token } from '@project/shared-types';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name)

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
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

    return (await this.userRepository.save(userEntity)).toPOJO();
  }

  public async createUserToken (user: UserInterface) : Promise<Token> {
    const payload : TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar || ''
    }

    try {
      const accessToken = await this.generateAccessToken(payload)
      return { accessToken }
    }
    catch(error) {
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  public async generateAccessToken (payload: TokenPayload) {
    return this.jwtService.signAsync(payload)
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

  public getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
