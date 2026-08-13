import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserRdo {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @Expose()
  id?: string;
  @ApiProperty({ description: 'User unique address', example: 'user@user.ru' })
  @Expose()
  email!: string;
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @Expose()
  name!: string;
  @ApiProperty({ description: 'User password', example: 'password' })
  password!: string;
  @ApiProperty({ description: 'User avatar', example: 'avatar.jpg' })
  @Expose()
  avatar?: string;
}
