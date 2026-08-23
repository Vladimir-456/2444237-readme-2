import { IsNumber, IsString, validateOrReject } from 'class-validator';

export class AppConfig {
  @IsNumber({}, { message: 'Port must be a number' })
  public port: number;
  @IsString({ message: 'Environment must be a string' })
  public environment: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
