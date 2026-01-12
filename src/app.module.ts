import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage/storage.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TracksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, StorageService],
})
export class AppModule {}
