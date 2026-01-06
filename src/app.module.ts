import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TracksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
