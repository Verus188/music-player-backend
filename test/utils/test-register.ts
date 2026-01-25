import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { App } from 'supertest/types';

export const testRegister = async (
  app: INestApplication<App>,
): Promise<AuthResponseDto> => {
  const email = `${Date.now()}@gmail.com`;
  const password = 'qwerty123456';
  const name = 'antonTester';

  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send({
      email,
      password,
      name,
    });

  return response.body as AuthResponseDto;
};
