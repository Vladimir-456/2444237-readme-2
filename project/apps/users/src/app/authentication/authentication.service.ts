import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

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

    const userEntity = await new UserEntity(user).setPassword(password);

    return (await this.userRepository.save(userEntity)).toPOJO();
  }

  public async verify(data: LoginUserDTO) {
    const { email, password } = data;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    if (!(await existUser.comparePassword(password))) {
      throw new ConflictException('Invalid password');
    }

    return existUser;
  }

  public getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
