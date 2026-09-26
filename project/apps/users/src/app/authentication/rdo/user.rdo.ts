import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserRDO {
    @ApiProperty({
        description: 'User ID',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    @Expose()
    id: string

    @ApiProperty({
        description: 'User subscribers',
        example: '10',
    })
    @Expose()
    subscribers: number

    @ApiProperty({
        description: 'User posts',
        example: '5',
    })
    @Expose()
    posts: number

    @ApiProperty({
        description: 'Created User date',
        example: '21.05.2005',
    })
    @Expose()
    createdDate: Date
}