import { IsString, validateOrReject } from 'class-validator';

export class JwtConfig {
  @IsString({ message: 'JWT secret must be a string' })
  accessTokenSecret: string;
  @IsString({ message: 'JWT expiresIn must be a string' })
  accessExpiresIn: string;
  
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
