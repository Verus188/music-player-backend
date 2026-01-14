import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApiTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Название трека',
    example: 'La frontière',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Исполнитель трека',
    example: 'David TMX',
  })
  artist: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Ссылка на трек от api, предоставляющего треки',
    example: 'https://prod-1.storage.jamendo.com/download/track/228/mp32/',
  })
  apiUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Ссылка на аудио трек от api, предоставляющего треки',
    example:
      'https://prod-1.storage.jamendo.com/?trackid=168&format=mp31&from=ctPvhfE2ixI32sHOfl5HRA%3D%3D%7CxQvK0aiMn%2F9IHX4XS4WfrQ%3D%3D',
  })
  audio: string;

  @IsNumber()
  @ApiProperty({
    description: 'Длительность трека в секундах',
    example: 185,
  })
  duration: number;

  @IsString()
  @ApiProperty({
    description: 'Название альбома трека',
    example: 'La Frontière',
  })
  albumName: string;

  @IsString()
  @ApiProperty({
    description: 'Ссылка на обложку альбома трека',
    example:
      'https://usercontent.jamendo.com?type=album&id=63189&width=300&trackid=542041',
  })
  albumImage: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Добавлен ли трек в избранное',
    example: false,
  })
  isFavorite: boolean;
}
