export interface UserCreatedDto {
  userId: string;
  email: string;
  name?: string;
}

export interface UserUpdatedDto {
  userId: string;
  email?: string;
  name?: string;
  isActive?: boolean;
}