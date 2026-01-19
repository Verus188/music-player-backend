import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTrackDto } from 'src/music/dto/api-track.dto';

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

  async getFavorites(userId: number): Promise<ApiTrackDto[]> {
    const favoriteTracks = await this.prismaService.track.findMany({
      where: {
        likedBy: {
          some: {
            id: userId,
          },
        },
      },
    });
    return favoriteTracks.map((track) => ({
      ...track,
      duration: track.duration ?? 0,
      isFavorite: true,
    }));
  }

  async addFavorite(userId: number, track: Omit<ApiTrackDto, 'isFavorite'>) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        favoriteTracks: {
          connectOrCreate: {
            where: { apiUrl: track.apiUrl },
            create: track,
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
