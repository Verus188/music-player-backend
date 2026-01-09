import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage/storage.service';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    TracksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, StorageService],
})
export class AppModule {}
