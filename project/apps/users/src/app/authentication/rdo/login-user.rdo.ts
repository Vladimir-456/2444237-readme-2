import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserRdo {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @Expose()
  email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @Expose()
  name!: string;
}
