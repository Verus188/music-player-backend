import { Injectable } from '@nestjs/common';
import { JamendoService } from './providers/jamendo/jamendo.service';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class MusicService {
  constructor(private readonly jamendoService: JamendoService) {}

  async searchTracks(query: string, user: JwtPayload) {
    return this.jamendoService.searchTracks(query, user);
  }
}
