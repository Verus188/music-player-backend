import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTrackDto } from 'src/music/dto/api-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: Omit<ApiTrackDto, 'isFavorite'>) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }
}
