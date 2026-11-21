import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '6ad1c41523ca94e2b3fb76b3',
  })
  id: string;

  @ApiProperty({
    description: 'Дата регистрации пользователя',
    example: '2026-11-21T08:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  registeredAt: string;

  @ApiProperty({
    description: 'Количество публикаций пользователя',
    example: 42,
  })
  postsCount: number;

  @ApiProperty({
    description: 'Количество подписчиков пользователя',
    example: 128,
  })
  subscribersCount: number;
}