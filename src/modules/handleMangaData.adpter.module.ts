import { IRabbitmqConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import { HandleMangaDataRabbitmqGatewayAdapter } from '@interfaceAdapters/gateways/rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { makeRabbitmqConfig } from 'src/helpers';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: COMMONS.RABBITMQ_PUBLISHER,
        useFactory: (configService: ConfigService) => {
          const rabbitConfig =
            configService.get<IRabbitmqConfig>('RABBITMQ_CONFIG');
          const { QUEUE_NAME } = rabbitConfig;

          return {
            transport: Transport.RMQ,
            options: {
              urls: makeRabbitmqConfig(rabbitConfig),
              queueOptions: {
                durable: true,
              },
              queue: QUEUE_NAME,
              noAck: true,
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: AbstractHandleMangaDataGatewayAdapter,
      useClass: HandleMangaDataRabbitmqGatewayAdapter,
    },
  ],
  exports: [AbstractHandleMangaDataGatewayAdapter],
})
export class HandleMangaDataAdapterModule {}
