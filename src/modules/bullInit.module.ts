import { COMMONS } from '@constants/index';
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
})
export class BullInitModule {}
