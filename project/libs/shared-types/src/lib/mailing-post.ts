export interface MailingPost {
  postId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  publishDate: string;
}

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