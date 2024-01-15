import { COMMONS } from '@constants/index';
import { Process, Processor } from '@nestjs/bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Processor(BULL_QUEUE_NAMES.MANGA)
export class MangaBullConsumer {
  @Process()
  handle() {}
}
