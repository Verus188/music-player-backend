import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StorageService } from 'src/storage/storage.service';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly storageService: StorageService,
  ) {}

  // TODO: запретить создавать треки через эндпоинт, когда будет api
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get('test-upload')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracksService.remove(+id);
  }
}
