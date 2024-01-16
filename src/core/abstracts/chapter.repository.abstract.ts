import { Chapter, IPage } from '@core/entities';

export abstract class AbstractChapterRepository {
  abstract findChapterByPath(path: string): Promise<Chapter>;
  abstract createChapter(chapter: Chapter): Promise<Chapter>;
  abstract updateChapterById(chapter: Chapter): Promise<Chapter>;
  abstract updatePagesInChapter(
    chapterId: number,
    pages: IPage[],
    completedCrawler: boolean,
  ): Promise<Chapter>;
  abstract findChaptersByRetryVersion(
    retryVersion: number,
    page: number,
    limit: number,
  ): Promise<Chapter[]>;
  abstract findTotalAndMarkRetryVersion(): Promise<{
    total: number;
    retryVersion: number;
  }>;
}
