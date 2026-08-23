import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';
import { DEFAULT_MONGO_PORT, MAX_PORT, MIN_PORT } from './mongo.const';

import { ValidationMessages } from './mongo.messages';

export class MongoConfiguration {
  @IsString({ message: ValidationMessages.DBNameRequired })
  public name!: string;

  @IsString({ message: ValidationMessages.DBHostRequired })
  public host!: string;

  @IsNumber({}, { message: ValidationMessages.DBPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: ValidationMessages.DBUserRequired })
  public user!: string;

  @IsString({ message: ValidationMessages.DBPasswordRequired })
  public password!: string;

  @IsString({ message: ValidationMessages.DBBaseAuthRequired })
  public authBase!: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
