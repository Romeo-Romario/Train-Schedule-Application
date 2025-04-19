import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://train-schedule-appliacation-23-7136cb6b5b63.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App is running on http://localhost:${port}`);
}
bootstrap();

