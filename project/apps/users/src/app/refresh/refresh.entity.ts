import { Entity } from "@project/core";
import { JwtToken } from "@project/shared-types";

export class RefreshTokenEntity implements JwtToken, Entity<string, JwtToken> {
  public createdAt: Date;
  public expiresIn: Date;
  public id: string;
  public tokenId: string;
  public userId: string;

  constructor (refreshToken: JwtToken) {
    this.populate(refreshToken)
  }

  public populate (data: JwtToken) {
    this.createdAt = data.createdAt;
    this.expiresIn = data.expiresIn;
    this.id = data.id || '';
    this.tokenId = data.tokenId;
    this.userId = data.userId;
  }

  public toPOJO () {
    return {
      id: this.id,
      userId: this.userId,
      tokenId: this.tokenId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    }
  }

  static fromObject(data: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(data)
  }
  
}