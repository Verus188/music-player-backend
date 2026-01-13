import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { ApiTrackDto } from 'src/music/dto/api-track.dto';
import { JamendoTrack } from 'src/music/interfaces/jamendo-track.interface';
import { MusicProvider } from 'src/music/interfaces/music-provider.interface';

@Injectable()
export class JamendoService implements MusicProvider {
  private readonly url = 'https://api.jamendo.com/v3.0';
  private readonly clientId = process.env.JAMENDO_CLIENT_ID;

  async searchTracks(query: string): Promise<ApiTrackDto[]> {
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

    return tracksFromApi.map((track) => this.toApiTrack(track));
  }

  async getTrack(trackId: string): Promise<ApiTrackDto> {
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

    return this.toApiTrack(track);
  }

  private toApiTrack(track: JamendoTrack): ApiTrackDto {
    return {
      duration: track.duration,
      title: track.name,
      artist: track.artist_name,
      apiUrl: track.audio,
    };
  }
}
