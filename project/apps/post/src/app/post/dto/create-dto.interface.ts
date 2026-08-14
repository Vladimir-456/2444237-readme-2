import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared-types';
import { IsUrl, MaxLength, Min, MinLength } from 'class-validator';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.LINK,
  })
  readonly type = PostType.LINK;

  @ApiProperty({ description: 'Post link', example: 'https://google.com' })
  @IsUrl({}, { message: 'Invalid link' })
  public link!: string;

  @MinLength(7, { message: 'Title must be shorter than 7 tags' })
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
  @MinLength(7, { message: 'Title must be shorter than 7 tags' })
  public tags?: string[];
}

export class CreateQuotePostDto {
  @ApiProperty({ description: 'Post type', example: PostType.QUOTE })
  readonly type = PostType.QUOTE;

  @MinLength(20, { message: 'Title must be at least 20 characters' })
  @MaxLength(300, { message: 'Title must be shorter than 300 characters' })
  @ApiProperty({ description: 'Post text', example: 'text' })
  public text!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  @MinLength(7, { message: 'Title must be shorter than 7 tags' })
  public tags?: string[];

  @MinLength(3, { message: 'Author must be at least 3 characters' })
  @MaxLength(50, { message: 'Author must be shorter than 50 characters' })
  @ApiProperty({ description: 'Post author', example: 'John Doe' })
  public author!: string;
}

export class CreateTextPostDto {
  @ApiProperty({ description: 'Post type', example: PostType.TEXT })
  readonly type = PostType.TEXT;

  @MinLength(20, { message: 'Title must be at least 20 characters' })
  @MaxLength(50, { message: 'Title must be shorter than 50 characters' })
  @ApiProperty({ description: 'Post title', example: 'title' })
  public title!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  @MinLength(7, { message: 'Title must be shorter than 7 tags' })
  public tags?: string[];

  @MinLength(50, { message: 'Preview must be at least 50 characters' })
  @MaxLength(255, { message: 'Preview must be shorter than 255 characters' })
  @ApiProperty({ description: 'Post preview', example: 'preview' })
  public preview!: string;

  @MinLength(100, { message: 'Text must be at least 100 characters' })
  @MaxLength(1024, { message: 'Text must be shorter than 1024 characters' })
  @ApiProperty({ description: 'Post text', example: 'text' })
  public text!: string;
}

export class CreateVideoPostDto {
  @ApiProperty({ description: 'Post type', example: PostType.VIDEO })
  readonly type = PostType.VIDEO;

  @MinLength(20, { message: 'Title must be at least 20 characters' })
  @MaxLength(50, { message: 'Title must be shorter than 50 characters' })
  @ApiProperty({ description: 'Post title', example: 'title' })
  public title!: string;
  @ApiProperty({ description: 'Post tags', example: ['tag1', 'tag2'] })
  public tags?: string[];

  @ApiProperty({ description: 'Post url', example: 'https://google.com' })
  @IsUrl({}, { message: 'Invalid url' })
  public url!: string;
}

export type CreatePostDTO =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;
