import { Controller, Get, Query } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('search')
  searchTracks(@Query('query') query: string) {
    return this.musicService.searchTracks(query);
  }
}
