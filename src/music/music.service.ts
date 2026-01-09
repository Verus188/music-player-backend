import { Injectable } from '@nestjs/common';
import { JamendoService } from './providers/jamendo/jamendo.service';

@Injectable()
export class MusicService {
  constructor(private readonly jamendoService: JamendoService) {}

  async searchTracks(query: string) {
    return this.jamendoService.searchTracks(query);
  }
}
