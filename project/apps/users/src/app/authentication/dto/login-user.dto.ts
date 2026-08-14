import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({
    message: 'Email is required',
  })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  @MaxLength(12, {
    message: 'Password must be shorter than 12 characters',
  })
  public password!: string;
}
