import { PostSort } from '@project/shared-types';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

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
}
