import { UserInterface } from "./user.interface";
import { Request } from 'express'

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string;
}

export interface JwtToken {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}

export interface RequestWithUser extends Request {
  user: UserInterface
}
