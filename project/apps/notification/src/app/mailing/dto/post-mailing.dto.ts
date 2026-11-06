export interface MailingPostDto {
  postId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  publishDate: string;
}

export interface PostMailingCreatedDto {
  mailingId: string;
  title: string;
  posts: MailingPostDto[];
}