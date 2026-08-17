import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRDO {
  @ApiProperty({
    description: 'Comment id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @Expose()
  id!: string;
  @Expose()
  @ApiProperty({ description: 'Comment text', example: 'text' })
  text!: string;
  @Expose()
  @ApiProperty({
    description: 'Comment author id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  authorId!: string;
  @Expose()
  @ApiProperty({
    description: 'Comment post id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  postId!: string;
  @ApiProperty({
    description: 'Comment creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt!: Date;
}
