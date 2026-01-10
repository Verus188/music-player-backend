import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(email: string, name: string, password: string) {
    return this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
