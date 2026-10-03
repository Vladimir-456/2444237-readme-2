import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryCommentDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  limit?: number = 50;
}
