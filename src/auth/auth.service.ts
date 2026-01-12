import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user || !(await compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async signUp(
    name: string,
    email: string,
    pass: string,
  ): Promise<AuthResponseDto> {
    const hashedPassword = await hash(pass, 10);

    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    await this.usersService.createUser(name, email, hashedPassword);

    return this.signIn(email, pass);
  }
}
