import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MusicProvider } from 'src/music/interfaces/music-provider.interface';

@Injectable()
export class JamendoService implements MusicProvider {
  url = 'https://api.jamendo.com/v3.0';

  async searchTracks(query: string): Promise<any> {
    const response = await axios.get(`${this.url}/tracks`, {
      params: {
        client_id: process.env.JAMENDO_CLIENT_ID,
        format: 'json',
        name: query,
      },
    });
    return response.data;
  }
  getTrack(trackId: string): Promise<any> {
    return axios.get(`${this.url}/tracks`, {
      params: {
        client_id: process.env.JAMENDO_CLIENT_ID,
        format: 'json',
        id: trackId,
      },
    });
  }
}
