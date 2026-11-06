import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class EmailSubscriberDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsMongoId()
    authorId: string;
}