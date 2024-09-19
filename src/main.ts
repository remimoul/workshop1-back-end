import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const corsOrigins = [
    process.env.FRONT_URL_DEV,
    process.env.FRONT_URL_PROD,
  ].filter(Boolean);

  app.enableCors({ origin: corsOrigins });

  const port: number = parseInt(process.env.PORT) || 2424;

  await app.listen(port);
}
bootstrap();
