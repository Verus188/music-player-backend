import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'La frontière', description: 'Название трека' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'David TMX', description: 'Исполнитель трека' })
  readonly artist: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://prod-1.storage.jamendo.com/download/track/228/mp32/',
    description: 'Ссылка на трек от api, предоставляющего треки',
  })
  readonly apiUrl: string;
}
