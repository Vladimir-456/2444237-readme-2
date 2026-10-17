import { IsNumber, IsString, validateOrReject } from 'class-validator';
export class NotifyAppConfig {
    @IsString({ message: 'Environment must be a string' })
    environment: string;
    @IsNumber({}, { message: 'Port must be a number' })
    port: string;

    public async validate(): Promise<void> {
        await validateOrReject(this)
    }
}