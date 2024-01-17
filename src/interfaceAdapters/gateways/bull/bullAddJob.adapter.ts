import { IAppConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter, AbstractLogger } from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
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

  async onModuleInit(): Promise<void> {
    await this.clearMangaQueue();
    await this.clearChapterQueue();
  }

  async clearMangaQueue() {
    await this.mangaQueue.empty();
    await this.mangaQueue.clean(0, 'active');
    await this.mangaQueue.clean(0, 'completed');
    await this.mangaQueue.clean(0, 'delayed');
    await this.mangaQueue.clean(0, 'failed');
  }

  async clearChapterQueue() {
    await this.chapterQueue.empty();
    await this.chapterQueue.clean(0, 'active');
    await this.chapterQueue.clean(0, 'completed');
    await this.chapterQueue.clean(0, 'delayed');
    await this.chapterQueue.clean(0, 'failed');
  }

  async addMangaJob(jobName: string, data: any): Promise<void> {
    this.mangaQueue.add(data, {
      jobId: jobName + data?.id,
      removeOnComplete: true,
    });
  }

  async addChapterJob(jobName: string, data: any): Promise<void> {
    this.chapterQueue.add(data, {
      jobId: jobName + data?.id,
      removeOnComplete: true,
    });
  }

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
