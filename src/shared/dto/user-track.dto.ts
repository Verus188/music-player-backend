import { ApiProperty } from '@nestjs/swagger';
import { ApiTrackDto } from './api-track.dto';
import { IsBoolean } from 'class-validator';

export class UserTrackDto extends ApiTrackDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Добавлен ли трек в избранное',
    example: false,
  })
  isFavorite: boolean;
}
