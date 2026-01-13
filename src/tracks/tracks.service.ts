import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }
}
