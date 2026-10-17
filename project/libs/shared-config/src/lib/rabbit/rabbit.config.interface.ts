export interface RabbitConnectionConfig {
    host: string;
    password: string;
    port : number;
    user: string;
}

export interface RabbitMessageConfig {
    queue: string;
    exchange: string;
}