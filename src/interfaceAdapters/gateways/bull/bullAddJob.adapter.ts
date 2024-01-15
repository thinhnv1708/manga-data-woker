import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter } from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Injectable()
export class BullAddJobAdapter implements AbstractAddJobAdapter {
  constructor(
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
  async retrySaveMangaJob(saveMangaInput: ISaveMangaInput): Promise<void> {}
  async retrySaveChapterJob(
    saveChapterInput: ISaveChapterInput,
  ): Promise<void> {}
}
