import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email!: string;
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(50, { message: 'Name must be shorter than 50 characters' })
  name!: string;
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must be shorter than 12 characters' })
  password!: string;
  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
  })
  @MaxLength(255, { message: 'Avatar must be shorter than 255 characters' })
  avatar?: string;
}
