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
  abstract findTotalNotCompletedMapDependenciesChapters(): Promise<number>;
  abstract findNotCompletedMapDependenciesChapters(
    page: number,
    limit: number,
  ): Promise<Chapter[]>;
}
