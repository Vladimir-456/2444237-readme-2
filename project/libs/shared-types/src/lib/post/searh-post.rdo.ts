import { Expose } from "class-transformer";
import { CreatePostDTO } from "./create-dto.interface";
import { ApiProperty } from "@nestjs/swagger";
import { CreatePostRDO } from "./create-post.rdo";

export class SearchPostRdo {
  @Expose()
  @ApiProperty({
    description: 'Total count',
    example: 12,
  })
  total: number;

  @Expose()
  @ApiProperty({
    description: 'Posts',
    type: CreatePostRDO,
    isArray: true,
  })
  items: CreatePostRDO[];
}