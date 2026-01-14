import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { ApiTrackDto } from '../dto/api-track.dto';

export interface MusicProvider {
  searchTracks(query: string, user: JwtPayload): Promise<ApiTrackDto[]>;
  getTrack(trackId: string, user: JwtPayload): Promise<ApiTrackDto>;
}
