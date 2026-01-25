import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createAppFixture } from './utils/create-app-fixture';
import { App } from 'supertest/types';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const registerDto: SignUpDto = {
    email: `${Date.now()}@gmail.com`,
    password: 'qwerty123456',
    name: 'antonTester',
  };
  const loginDto: Omit<SignUpDto, 'name'> = registerDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await createAppFixture();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(201);
  });

  it('auth/register (POST) - регистрация существующего пользователя', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(401);
  });

  it('auth/login (POST) - авторизация пользователя', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { email: registerDto.email } });
    await app.close();
  });
});
