import { ApiProperty } from '@nestjs/swagger';

export class ApiTrackDto {
  @ApiProperty({
    description: 'Название трека',
    example: 'La frontière',
  })
  title: string;

  @ApiProperty({
    description: 'Исполнитель трека',
    example: 'David TMX',
  })
  artist: string;

  @ApiProperty({
    description: 'Ссылка на трек от api, предоставляющего треки',
    example: 'https://prod-1.storage.jamendo.com/download/track/228/mp32/',
  })
  apiUrl: string;

  @ApiProperty({
    description: 'Длительность трека в секундах',
    example: 185,
  })
  duration?: number | null;
}
