import { IsString } from "class-validator";

export class NotifyPostPublishedDto {
    @IsString()
    postId: string;
    @IsString()
    title: string;
    @IsString()
    authorId: string;
    @IsString()
    authorEmail: string;
}