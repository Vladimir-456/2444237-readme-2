type RabbitMQConnection = {
    user: string
    password: string
    host: string
    port: number
}

export function getRabbitMQConnectionString({user, password, host, port} : RabbitMQConnection): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}