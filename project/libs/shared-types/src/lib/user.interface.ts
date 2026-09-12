export interface UserInterface {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export interface UserAvatarInterface {
  userId: string;
  mimetype: string;
  size: number;
  path: string;
  filename: string;
}
