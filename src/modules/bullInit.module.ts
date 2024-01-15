import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter } from '@core/abstracts';
import { BullAddJobAdapter } from '@interfaceAdapters/gateways/bull';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue(
      ...Object.values(COMMONS.BULL_QUEUE_NAMES).map((queueName) => ({
        name: queueName,
      })),
    ),
  ],
  providers: [{ provide: AbstractAddJobAdapter, useClass: BullAddJobAdapter }],
  exports: [AbstractAddJobAdapter],
})
export class BullInitModule {}
