import { NotifyPostPublishedDto } from "./notify.post.published.dto";

export class NotifyNewPostsDto {
  digestEventId: string;
  since: string;
  posts: NotifyPostPublishedDto[];
}