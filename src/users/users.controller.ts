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
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTrackDto } from 'src/shared/dto/api-track.dto';
import { UserTrackDto } from 'src/shared/dto/user-track.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/favorites')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getFavorites(@Request() req: RequestWithUser): Promise<UserTrackDto[]> {
    return this.usersService.getFavorites(req.user.sub);
  }

  @Post('me/favorites')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  addFavorite(
    @Request() req: RequestWithUser,
    @Body() track: ApiTrackDto,
  ): Promise<UserTrackDto[]> {
    return this.usersService.addFavorite(req.user.sub, track);
  }

  @Delete('me/favorites/:trackId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  removeFavorite(
    @Request() req: RequestWithUser,
    @Param('trackId') trackId: number,
  ): Promise<UserTrackDto[]> {
    return this.usersService.removeFavorite(req.user.sub, trackId);
  }
}
