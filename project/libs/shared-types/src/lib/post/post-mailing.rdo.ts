import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PostMailingRdo {
    @ApiProperty({
        description: 'status',
        example: 'nothing_to_send',
    })
    @Expose()
    status: string;
    @ApiProperty({
        description: 'digestId',
        example: '323gdfgbc43553fgd',
    })
    @Expose()
    digestId: string;
    @ApiProperty({
        description: 'mailingId',
        example: '523gdffdgbc43553fgd',
    })
    @Expose()
    mailingId: string;
    @ApiProperty({
        description: 'postsCount',
        example: 12,
    })
    @Expose()
    postsCount: number;
}