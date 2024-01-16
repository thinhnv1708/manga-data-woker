import { COMMONS } from '@constants/index';
import { ChapterRetryUseCase } from '@core/useCases/chapter/chapterRetry.useCase';
import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Processor(BULL_QUEUE_NAMES.RETRY_SAVE_CHAPTER)
export class RetryChapterBullConsumer {
  constructor(private readonly chapterRetryUseCase: ChapterRetryUseCase) {
    console.log('vao dayyyyyy');
  }

  @Process()
  async handleChunkChapters(
    job: Job<{ retryVersion: number; page: number; limit: number }>,
    done: DoneCallback,
  ): Promise<void> {
    const { retryVersion, page, limit } = job.data;
    console.log('nhan queue', job.data);

    await this.chapterRetryUseCase.handleRetry(retryVersion, page, limit);

    return done();
  }
}
