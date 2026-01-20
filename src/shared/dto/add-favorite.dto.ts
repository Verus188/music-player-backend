import { OmitType } from '@nestjs/swagger';
import { ApiTrackDto } from 'src/shared/dto/api-track.dto';

export class UserTrackDto extends OmitType(ApiTrackDto, [
  'isFavorite',
] as const) {}
