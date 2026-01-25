import { INestApplication, ValidationPipe } from '@nestjs/common';
import { createAppFixture } from './utils/create-app-fixture';
import request from 'supertest';
import { App } from 'supertest/types';
import { testRegister } from './utils/test-register';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('MusicController (e2e)', () => {
  let app: INestApplication<App>;
  let user: AuthResponseDto;
  let prisma: PrismaService;
  const trackName = 'hold on';

  beforeAll(async () => {
    const moduleFixture = await createAppFixture();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    user = await testRegister(app);
  });

  it('music/search (GET) - поиск треков', async () => {
    const response = await request(app.getHttpServer())
      .get('/music/search')
      .auth(user.accessToken, { type: 'bearer' })
      .query({ query: trackName })
      .expect(200);

    console.log(response.body);

    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { email: user.user.email } });
    await app.close();
  });
});
