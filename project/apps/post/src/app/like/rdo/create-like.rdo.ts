import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateLikeRdo {
  @ApiProperty({
    description: 'Like id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @Expose()
  id!: string;
  @Expose()
  @ApiProperty({
    description: 'Like post id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  postId!: string;
  @Expose()
  @ApiProperty({
    description: 'Like user id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  userId!: string;
  @Expose()
  @ApiProperty({
    description: 'Like creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt!: Date;
}
