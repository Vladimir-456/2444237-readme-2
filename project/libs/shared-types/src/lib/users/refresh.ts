import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class RefreshDto {
  @IsString()
  @ApiProperty({
    description: 'Refresh token',
     example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyfgZCI6IjZhZDFjNDE1MjNjYTk0ZTJiM2ZiNzZiMyIsImVtYWlsIjoidmxhZEBiay5ydSIsIm5hbWUiOiJBbGV4IiwiYXZhdGFyIjoiaW1hZ2UucG5nIiwidG9rZW5JZCI6ImU0MjkxNzRmLTk5MzItNDkyZS05YjQ0LWQzN2YxZTFlMmZiMSIsImlhdCI6MTc5NDU4Mjg3MywiZXhwIjoxNzk1NDQ2ODczfQ.kPpM4GjFbRufa02C1FR0yRkgf4ntFanCbQ506aL2_oc',
  })
  refreshToken: string;
}


export class RefreshRdo {
    @Expose()
    @ApiProperty({
        title: 'Access token',
        description: 'access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZDFjNDE1MjNjYTk0ZTJiM2ZiNzZiMyIsImVtYWlsIjoidmxhZEBiay5ydSIsIm5hbWUiOiJBbGV4IiwiYXZhdGFyIjoiaW1hZ2UucG5nIiwidG9rZW5JZCI6ImU0MjkxNzRmLTk5MzItNDkyZS05YjQ0LWQzN2YxZTFlMmZiMSIsImlhdCI6MTc5NDU4Mjg3MywiZXhwIjoxNzk1NDQ2ODczfQ.kPpM4GjFbRufa02C1FR0yRkgf4ntFanCbQ506aL2_oc'
    })
    accessToken: string;
    @ApiProperty({
        title: 'Refresh token',
        description: 'refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyfgZCI6IjZhZDFjNDE1MjNjYTk0ZTJiM2ZiNzZiMyIsImVtYWlsIjoidmxhZEBiay5ydSIsIm5hbWUiOiJBbGV4IiwiYXZhdGFyIjoiaW1hZ2UucG5nIiwidG9rZW5JZCI6ImU0MjkxNzRmLTk5MzItNDkyZS05YjQ0LWQzN2YxZTFlMmZiMSIsImlhdCI6MTc5NDU4Mjg3MywiZXhwIjoxNzk1NDQ2ODczfQ.kPpM4GjFbRufa02C1FR0yRkgf4ntFanCbQ506aL2_oc'
    })
    refreshToken: string;
}