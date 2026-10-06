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

  @ApiProperty({
    description: 'Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YWI2NzRkMWRjOTU1MmVlMmFlZTAzYzAiLCJlbWFpbCI6InZsYWQuc3RhdnJvc0Biay5ydSIsIm5hbWUiOiJBbGV4IiwiYXZhdGFyIjoiaW1hZ2UucG5nIiwiaWF0IjoxNzkwNDMzNzQ4LCJleHAiOjE3OTA0MzQ2NDh9.OSrxCc-saZsxYS27CJ4N0lNXANcDccInOJ_VuW9mFK0'
  })
  @Expose()
  accessToken!: string
}
