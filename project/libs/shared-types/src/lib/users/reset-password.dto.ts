import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @MinLength(6)
    @ApiProperty({
        title: 'Текущий пароль',
        example: 'qwerty228!sf'
    })
    currentPassword: string;
    @IsString()
    @MinLength(6)
    @ApiProperty({
        title: 'Новый пароль',
        example: 'sdfw3sdds1228!sf'
    })
    newPassword: string;
}