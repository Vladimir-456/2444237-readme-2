import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@project/shared-types';
import { Expose } from 'class-transformer';

export class CreatePostRDO {
  @ApiProperty({
    description: 'Post id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @Expose()
  id!: string;

  @Expose()
  @ApiProperty({
    description: 'Post author id',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  authorId!: string;

  @Expose()
  @ApiProperty({ description: 'Post type', example: PostType.TEXT })
  type!: PostType;

  @Expose()
  @ApiProperty({ description: 'Post status', example: PostStatus.PUBLISHED })
  status!: PostStatus;

  @Expose()
  @ApiProperty({
    description: 'Post creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post update date',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt!: Date;

  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  @Expose()
  tags!: string[];

  @ApiProperty({ description: 'Post title', example: 'title' })
  @Expose()
  title?: string;

  @ApiProperty({ description: 'Post link', example: 'https://google.com' })
  @Expose()
  link?: string;

  @ApiProperty({ description: 'Post url', example: 'https://google.com' })
  @Expose()
  url?: string;
  @Expose()
  preview?: string;

  @ApiProperty({ description: 'Post text', example: 'text' })
  @Expose()
  text?: string;

  @ApiProperty({ description: 'Post author', example: 'John Doe' })
  @Expose()
  author?: string;

  @ApiProperty({
    description: 'Post image url',
    example: 'https://google.com/image.jpg',
  })
  @Expose()
  imageUrl?: string;

  @ApiProperty({ description: 'Post description', example: 'description' })
  @Expose()
  description?: string;
}
