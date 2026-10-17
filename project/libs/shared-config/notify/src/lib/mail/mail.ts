import { IsNumber, IsString, validateOrReject } from "class-validator";

const DEFAULT_SMTP_PORT = 25;

export class MailConfig {
    @IsString()
    host: string;

    @IsNumber()
    port : number = DEFAULT_SMTP_PORT;

    @IsString()
    from: string;

    async validate () {
        await validateOrReject(this)
    }
}