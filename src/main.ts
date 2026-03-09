import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = NestFactory.create(AppModule);

  (await app).useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips fields not in DTO
      forbidNonWhitelisted: true, // throws error for unknown fields
      transform: true, // auto-converts types
    }),
  );
  (await app).enableCors({
    origin: [process.env.FRONTEND_URL], // ← 'null' = file:// origin
    credentials: true,
  });
  (await app).listen(process.env.PORT ?? 3000);
}
bootstrap();
