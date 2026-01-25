import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { StorageService } from 'src/storage/storage.service';

export const createAppFixture = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(StorageService)
    .useValue({
      onModuleInit: jest.fn().mockResolvedValue(undefined),
      uploadFile: jest.fn().mockResolvedValue({ url: 'http://fake-url.com' }),
    })
    .compile();

  return moduleFixture;
};
