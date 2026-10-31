import {IsString} from "class-validator";

export class CreatePostMailingDto {
    @IsString()
    title: string;
}