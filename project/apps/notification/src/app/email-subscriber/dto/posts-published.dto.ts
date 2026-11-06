export interface PostPublishedDto {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  publishedAt: Date;
}


export class NotifyNewPostsDto {
    public since: Date
    public posts: PostPublishedDto
}