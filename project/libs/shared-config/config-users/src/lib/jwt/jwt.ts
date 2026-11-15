import { IsString, validateOrReject } from 'class-validator';

export class JwtConfig {
  @IsString({ message: 'JWT secret must be a string' })
  accessTokenSecret: string;
  @IsString({ message: 'JWT expiresIn must be a string' })
  accessExpiresIn: string;

  @IsString({ message: 'Refresh JWT secret must be a string' })
  refreshTokenSecret: string;

  @IsString({ message: 'Refresh JWT expiresIn must be a string' })
  refreshExpiresIn: string;
  
  async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
