import { COMMONS } from '@constants/index';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Processor(BULL_QUEUE_NAMES.RETRY_SAVE_MANGA)
export class RetryMangaBullConsumer {
  @Process()
  async handleRetrySaveManga(
    job: Job<ISaveMangaInput>,
    done: DoneCallback,
  ): Promise<void> {
    const { data } = job;
    console.log(data);

    return done();
  }
}
