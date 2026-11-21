export enum ApplicationServiceURL {
    Auth = 'http://localhost:3200/api/auth',
    User = 'http://localhost:3200/api/users',
    Post = 'http://localhost:3500/api/post',
    Subscribers = 'http://localhost:3400/api/subscribers'
} 

export const HTTP_CLIENT_MAX_REDIRECTS = 5
export const HTTP_CLIENT_TIMEOUT = 5000