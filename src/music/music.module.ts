import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { JamendoService } from './providers/jamendo/jamendo.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [MusicController],
  providers: [MusicService, JamendoService, UsersService, PrismaService],
})
export class MusicModule {}
