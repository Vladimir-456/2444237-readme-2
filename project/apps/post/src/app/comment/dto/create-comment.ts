import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'text',
  })
  @IsString()
  @Length(10, 300)
  public text!: string;

  @IsUUID()
  @ApiProperty({ description: 'Comment author ID', example: 'uuid' })
  public postId!: string;
}
