import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared-types';
import { MaxLength, Min, MinLength } from 'class-validator';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.LINK,
  })
  readonly type = PostType.LINK;

  @ApiProperty({ description: 'Post link', example: 'https://google.com' })
  public link!: string;

  @MinLength(3)
  @MaxLength(10)
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];

  @MaxLength(300)
  @ApiProperty({ description: 'Post description', example: 'description' })
  public description?: string;
}

export class CreatePhotoPostDto {
  @ApiProperty({ description: 'Post type', example: PostType.PHOTO })
  readonly type = PostType.PHOTO;
  @ApiProperty({ description: 'Post image', example: 'image.jpg' })
  public imageUrl!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];
}

export class CreateQuotePostDto {
  @ApiProperty({ description: 'Post type', example: PostType.QUOTE })
  readonly type = PostType.QUOTE;

  @MinLength(20)
  @MaxLength(300)
  @ApiProperty({ description: 'Post text', example: 'text' })
  public text!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];

  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ description: 'Post author', example: 'John Doe' })
  public author!: string;
}

export class CreateTextPostDto {
  @ApiProperty({ description: 'Post type', example: PostType.TEXT })
  readonly type = PostType.TEXT;

  @MinLength(20)
  @MaxLength(50)
  @ApiProperty({ description: 'Post title', example: 'title' })
  public title!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];

  @MinLength(50)
  @MaxLength(255)
  @ApiProperty({ description: 'Post preview', example: 'preview' })
  public preview!: string;

  @MinLength(100)
  @MaxLength(1024)
  @ApiProperty({ description: 'Post text', example: 'text' })
  public text!: string;
}

export class CreateVideoPostDto {
  @ApiProperty({ description: 'Post type', example: PostType.VIDEO })
  readonly type = PostType.VIDEO;

  @MinLength(20)
  @MaxLength(50)
  @ApiProperty({ description: 'Post title', example: 'title' })
  public title!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];

  @ApiProperty({ description: 'Post url', example: 'https://google.com' })
  public url!: string;
}

export type CreatePostDTO =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;
