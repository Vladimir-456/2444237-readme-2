import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'text',
  })
  @IsString()
  @Length(10, 300)
  public text!: string;
}
