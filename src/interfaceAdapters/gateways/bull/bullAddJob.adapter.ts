import { IAppConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter } from '@core/abstracts';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Injectable()
export class BullAddJobAdapter implements AbstractAddJobAdapter, OnModuleInit {
  private retrySaveMangaDelayMs = 60 * 1000;

  constructor(
    private readonly configService: ConfigService,
    @InjectQueue(BULL_QUEUE_NAMES.GENRE) private genreQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.MANGA) private mangaQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.CHAPTER) private chapterQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.RETRY_SAVE_MANGA)
    private retrySaveMangaQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.RETRY_SAVE_CHAPTER)
    private retrySaveChapterQueue: Queue,
  ) {
    const appConfig = this.configService.get<IAppConfig>('APP_CONFIG');
    this.retrySaveMangaDelayMs = appConfig.RETRY_SAVE_DATA_DELAY_SECONDS * 1000;
  }

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

  // async retrySaveMangaJob(saveMangaInput: ISaveMangaInput): Promise<void> {
  //   await this.retrySaveMangaQueue.add(saveMangaInput, {
  //     removeOnComplete: true,
  //     delay: this.retrySaveMangaDelayMs,
  //   });
  // }

  async retrySaveChapterJob(page: number, limit: number): Promise<void> {
    await this.retrySaveChapterQueue.add(
      { page, limit },
      {
        removeOnComplete: true,
      },
    );
  }
}
