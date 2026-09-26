import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@project/shared-types';
import { Expose } from 'class-transformer';

export class LoginUserRdo {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @Expose()
  id: string;

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

  @Expose()
  accessToken!: string
}
