import { IAppConfig } from '@configurations/interfaces';
import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter } from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Injectable()
export class BullAddJobAdapter implements AbstractAddJobAdapter {
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

  async addMangaJob(jobName: string, data: any): Promise<void> {}
  async addGenreJob(jobName: string, data: any): Promise<void> {}
  async addChapterJob(jobName: string, data: any): Promise<void> {}

  async retrySaveMangaJob(saveMangaInput: ISaveMangaInput): Promise<void> {
    await this.retrySaveMangaQueue.add(saveMangaInput, {
      removeOnComplete: true,
      delay: this.retrySaveMangaDelayMs,
    });
  }

  async retrySaveChapterJob(
    saveChapterInput: ISaveChapterInput,
  ): Promise<void> {
    await this.retrySaveChapterQueue.add(saveChapterInput, {
      removeOnComplete: true,
      delay: this.retrySaveMangaDelayMs,
    });
  }
}
