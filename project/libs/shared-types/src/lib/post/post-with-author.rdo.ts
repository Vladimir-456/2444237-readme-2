import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostStatus, PostType } from '../post.interface';

export class UserRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '6ad1c41523ca94e2b3fb76b3',
  })
  id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Ivan Petrov',
  })
  name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'ivan@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Дата регистрации',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date
}

export class CreatePostWithUserRDO {
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
  typePost!: PostType;

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

  @ApiProperty({ description: 'Post author', example: UserRdo })
  @Expose()
  author?: UserRdo;

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
