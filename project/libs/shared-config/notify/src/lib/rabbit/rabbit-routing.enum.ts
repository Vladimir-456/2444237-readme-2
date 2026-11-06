export enum RabbitRouting {
    AddSubscriber = 'notify.addSubscriber',
    NotifyPostPublished = 'notify.postPublished',
    NotifyLetterRequested = 'notify.requested',
    NotifyNewPostsPublished = 'posts.notify-new-published',
    PostMailingCreated = 'post.mailerCreated',
    UserCreated = 'users.created',
    UserUpdated = 'users.updated',
}


export interface NotifyRequestedEvent {
    eventId: string;
    userId: string;
    requestedAt: string;
}
