import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { JamendoService } from './providers/jamendo/jamendo.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService, JamendoService],
})
export class MusicModule {}
