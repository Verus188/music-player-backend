import { Controller, Get, Post, Body } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { StorageService } from 'src/storage/storage.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserTrackDto } from 'src/shared/dto/user-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Получение треков с api',
    description: 'Будет удалена в будущем',
  })
  findAll() {
    return this.tracksService.findAll();
  }

  // TODO: запретить создавать треки через эндпоинт, когда будет api
  @Post()
  @ApiOperation({
    summary: 'Загрузка трека в бд',
    description: 'Сейчас нужна для тестов. В будущем будет удалена',
  })
  create(@Body() userTrackDto: UserTrackDto) {
    return this.tracksService.create(userTrackDto);
  }

  @Get('test-upload')
  @ApiOperation({
    summary: 'Загрузка тестового файла в хранилище',
    description: 'Будет удален в будущем',
  })
  async testUpload() {
    const buffer = Buffer.from('Hello, World!', 'utf-8');
    const fileName = `test-${Date.now()}.txt`;
    const url = await this.storageService.uploadFile(
      buffer,
      fileName,
      'text/plain',
    );

    return { message: 'File uploaded successfully', url };
  }
}
