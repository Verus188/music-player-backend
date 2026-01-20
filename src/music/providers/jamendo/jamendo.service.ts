import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { ApiTrackDto } from 'src/shared/dto/api-track.dto';
import { JamendoTrack } from 'src/music/interfaces/jamendo-track.interface';
import { MusicProvider } from 'src/music/interfaces/music-provider.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JamendoService implements MusicProvider {
  private readonly url = 'https://api.jamendo.com/v3.0';
  private readonly clientId = process.env.JAMENDO_CLIENT_ID;

  constructor(private readonly usersService: UsersService) {}

  async searchTracks(query: string, user: JwtPayload): Promise<ApiTrackDto[]> {
    const response = await axios.get<{ results: JamendoTrack[] }>(
      `${this.url}/tracks`,
      {
        params: {
          client_id: this.clientId,
          format: 'json',
          name: query,
        },
      },
    );
    const tracksFromApi = response.data.results;

    const favoriteTrackUrls = await this.getFavoriteTrackUrls(user);

    return tracksFromApi.map((track) =>
      this.toApiTrack(track, favoriteTrackUrls),
    );
  }

  async getTrack(trackId: string, user: JwtPayload): Promise<ApiTrackDto> {
    const response = await axios.get<{ results: JamendoTrack[] }>(
      `${this.url}/tracks`,
      {
        params: {
          client_id: this.clientId,
          format: 'json',
          id: trackId,
        },
      },
    );

    const track = response.data.results[0];

    if (!track) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    const favoriteTrackUrls = await this.getFavoriteTrackUrls(user);

    return this.toApiTrack(track, favoriteTrackUrls);
  }

  private async getFavoriteTrackUrls(user: JwtPayload) {
    const favoriteTracks = await this.usersService.getFavorites(user.sub);
    const favoriteTrackUrls = new Set(
      favoriteTracks.map((track) => track.apiUrl),
    );
    return favoriteTrackUrls;
  }

  private toApiTrack(
    track: JamendoTrack,
    favoriteTrackUrls: Set<string>,
  ): ApiTrackDto {
    const apiUrl = `https://www.jamendo.com/track/${track.id}`;

    return {
      duration: track.duration,
      title: track.name,
      artist: track.artist_name,
      apiUrl: apiUrl,
      audio: track.audio,
      albumName: track.album_name,
      albumImage: track.album_image,
      isFavorite: favoriteTrackUrls.has(apiUrl),
    };
  }
}
