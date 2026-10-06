export interface Token {
  accessToken: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  avatar: string;
}
