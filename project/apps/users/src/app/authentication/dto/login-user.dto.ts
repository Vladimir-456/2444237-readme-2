import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  public password!: string;
}
