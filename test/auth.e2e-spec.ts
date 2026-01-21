import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { App } from 'supertest/types';
import { StorageService } from 'src/storage/storage.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StorageService)
      .useValue({
        onModuleInit: jest.fn().mockResolvedValue(undefined),
        uploadFile: jest.fn().mockResolvedValue({ url: 'http://fake-url.com' }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('auth/register (POST) - создание пользователя в БД', async () => {
    const registerDto: SignUpDto = {
      email: 'anton@gmail.com',
      password: 'qwerty123456',
      name: 'anton',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');

    const userInDb = await prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    expect(userInDb).toBeDefined();
    expect(userInDb?.email).toBe(registerDto.email);
  });

  it('auth/login (POST) - авторизация пользователя', async () => {
    const registerDto: SignUpDto = {
      email: 'anton@gmail.com',
      password: 'qwerty123456',
      name: 'anton',
    };
    const loginDto: Omit<SignUpDto, 'name'> = registerDto;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });

  afterAll(async () => {
    await app.close();
  });
});
