import { IAppConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter, AbstractLogger } from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { BULL_QUEUE_NAMES } = COMMONS;

@Injectable()
export class BullAddJobAdapter implements AbstractAddJobAdapter {
  constructor(
    private readonly logger: AbstractLogger,
    @InjectQueue(BULL_QUEUE_NAMES.GENRE) private genreQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.MANGA) private mangaQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.CHAPTER) private chapterQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.RETRY_SAVE_MANGA)
    private retrySaveMangaQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.RETRY_SAVE_CHAPTER)
    private retrySaveChapterQueue: Queue,
  ) {}

  async addMangaJob(jobName: string, data: any): Promise<void> {}
  async addGenreJob(jobName: string, data: any): Promise<void> {}
  async addChapterJob(jobName: string, data: any): Promise<void> {}

  async retrySaveChapterJob(
    retryVersion: number,
    page: number,
    limit: number,
  ): Promise<void> {
    await this.retrySaveChapterQueue.add(
      { retryVersion, page, limit },
      {
        removeOnComplete: true,
      },
    );

    this.logger.log(
      buildLogMessage(
        `Add job retry save chapter`,
        JSON.stringify({ retryVersion, page, limit }),
      ),
      buildContextLog('BULL_ADD_JOB_ADAPTER', 'retrySaveChapterJob'),
    );
  }
}
