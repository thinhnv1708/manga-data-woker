import { AbstractLoggerAdapter } from '@core/abtracts';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IAppConfig } from '@configurations/interfaces';
import { LOGGER } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const loggerService = app.get(AbstractLoggerAdapter);
  const appConfig = configService.get<IAppConfig>('APP_CONFIG');
  const { PORT } = appConfig;

  await app.listen(PORT, () => {
    loggerService.log(
      `Server running on port ${PORT}`,
      'Bootstrap',
      LOGGER.DEBUG_LEVEL.FORCE,
    );
  });
}
bootstrap();
