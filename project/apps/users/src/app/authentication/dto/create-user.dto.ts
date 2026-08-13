import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  email!: string;
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @MinLength(3)
  @MaxLength(50)
  name!: string;
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @MinLength(6)
  @MaxLength(12)
  password!: string;
  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
  })
  avatar?: string;
}
