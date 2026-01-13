import {
  Controller,
  Get,
  Post,
  Delete,
  Request,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { RequestWithUser } from 'src/auth/interfaces/auth.interface';
import type { Track, User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me/favorites')
  getFavorites(@Request() req: RequestWithUser): Promise<Track[]> {
    return this.usersService.getFavorites(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('me/favorites')
  addFavorite(
    @Request() req: RequestWithUser,
    @Body() track: Track,
  ): Promise<User> {
    return this.usersService.addFavorite(req.user.sub, track);
  }

  @UseGuards(AuthGuard)
  @Delete('me/favorites/:trackId')
  removeFavorite(
    @Request() req: RequestWithUser,
    @Param('trackId') trackId: number,
  ): Promise<User> {
    return this.usersService.removeFavorite(req.user.sub, trackId);
  }
}
