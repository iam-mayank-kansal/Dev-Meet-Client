import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from './lib/loaders/logger.loader';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/env';
import { ValidationPipe } from '@nestjs/common';
import { AppSecurityLoader } from './lib/loaders/app_security.loader';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
  });

  const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Apply security
  AppSecurityLoader(app);

  // Route prefix
  app.setGlobalPrefix(config.get('APP_ROUTE_PREFIX'), { exclude: ['metrics'] });

  // Swagger Docs
  // SwaggerLoader(app, config);  

  // Start app
  await app.listen(config.get('APP_PORT'));

}
bootstrap();
