import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: '*', // TODO: изменить на конкретный домен в продакшене
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
