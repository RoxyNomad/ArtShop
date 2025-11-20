// apps/api/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
