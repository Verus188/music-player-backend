import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUser(name: string, email: string, password: string) {
    return this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async getFavorites(userId: number) {
    const tracks = await this.prismaService.track.findMany({
      where: {
        id: userId,
      },
    });
    return tracks;
  }

  async addFavorite(userId: number, track: Track) {
    const trackData: Omit<Track, 'id' | 'createdAt'> = track;

    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        favoriteTracks: {
          connectOrCreate: {
            where: { apiUrl: track.apiUrl },
            create: trackData,
          },
        },
      },
      include: {
        favoriteTracks: true,
      },
    });
  }

  async removeFavorite(userId: number, trackId: number) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        favoriteTracks: {
          disconnect: {
            id: trackId,
          },
        },
      },
      include: {
        favoriteTracks: true,
      },
    });
  }
}
