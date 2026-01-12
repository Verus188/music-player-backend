import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user || !(await compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    name: string,
    email: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const hashedPassword = await hash(pass, 10);

    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    await this.usersService.createUser(name, email, hashedPassword);

    return this.signIn(email, pass);
  }
}
