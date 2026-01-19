import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { RequestWithUser } from 'src/auth/interfaces/auth.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('search')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  searchTracks(@Query('query') query: string, @Req() req: RequestWithUser) {
    return this.musicService.searchTracks(query, req.user);
  }
}
