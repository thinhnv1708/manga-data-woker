import { COMMONS } from '@constants/index';
import { ChapterRetryUseCase } from '@core/useCases/chapter/chapterRetry.useCase';
import { Process, Processor } from '@nestjs/bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Processor(BULL_QUEUE_NAMES.CHAPTER)
export class ChapterBullConsumer {
  constructor(private readonly chapterRetryUseCase: ChapterRetryUseCase) {}

  @Process()
  async handle(): Promise<void> {}
}
