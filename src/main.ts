import { IAppConfig, IRabbitmqConfig } from '@configurations/interfaces';
import { AbstractLogger } from '@core/abstracts';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LOGGER } from './constants';
import { makeRabbitmqConfig } from './helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(AbstractLogger);
  const appConfig = configService.get<IAppConfig>('APP_CONFIG');
  const rabbitConfig = configService.get<IRabbitmqConfig>('RABBITMQ_CONFIG');
  const { PORT } = appConfig;
  const { QUEUE_NAME } = rabbitConfig;

  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: makeRabbitmqConfig(rabbitConfig),
      queueOptions: {
        durable: true,
      },
      queue: QUEUE_NAME,
      noAck: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT, () => {
    logger.log(
      `Server running on port ${PORT}`,
      'Bootstrap',
      LOGGER.DEBUG_LEVEL.FORCE,
    );
  });
}
bootstrap();
