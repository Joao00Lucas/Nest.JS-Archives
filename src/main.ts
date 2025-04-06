import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LogInterceptor } from './interceptors/log.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const prismaService = app.get(PrismaService);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LogInterceptor());

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
