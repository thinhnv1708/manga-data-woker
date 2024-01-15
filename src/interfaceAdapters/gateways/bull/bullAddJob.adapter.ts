import { COMMONS } from '@constants/index';
import { AbstractAddJobAdapter } from '@core/abstracts';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from 'agenda-nest';
import { Queue } from 'bull';
const { BULL_QUEUE_NAMES } = COMMONS;

@Injectable()
export class BullAddJobAdapter implements AbstractAddJobAdapter {
  constructor(
    @InjectQueue(BULL_QUEUE_NAMES.GENRE) private genreQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.MANGA) private mangaQueue: Queue,
    @InjectQueue(BULL_QUEUE_NAMES.CHAPTER) private chapterQueue: Queue,
  ) {}

  async addMangaJob(jobName: string, data: any): Promise<void> {}
  async addGenreJob(jobName: string, data: any): Promise<void> {}
  async addChapterJob(jobName: string, data: any): Promise<void> {}
}
