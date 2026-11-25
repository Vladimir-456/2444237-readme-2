import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PostSort, PostType } from '../post.interface';

export class PostQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Expose()
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @Expose()
  limit = 25;

  @IsOptional()
  @IsEnum(PostSort)
  @Expose()
  sort: PostSort = PostSort.NEWEST;

  @IsOptional()
  @IsEnum(PostType)
  @Expose()
  type: string;

  @IsOptional()
  @Expose()
  tag: string;

  @IsOptional()
  @Expose()
  draft: boolean
}
