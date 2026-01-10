import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
