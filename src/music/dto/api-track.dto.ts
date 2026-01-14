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
    description: 'Ссылка на аудио трек от api, предоставляющего треки',
    example:
      'https://prod-1.storage.jamendo.com/?trackid=168&format=mp31&from=ctPvhfE2ixI32sHOfl5HRA%3D%3D%7CxQvK0aiMn%2F9IHX4XS4WfrQ%3D%3D',
  })
  apiAudioUrl: string;

  @ApiProperty({
    description: 'Длительность трека в секундах',
    example: 185,
  })
  duration?: number | null;
}
