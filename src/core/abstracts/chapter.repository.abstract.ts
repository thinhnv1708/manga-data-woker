import { Chapter } from '@core/entities';

export abstract class AbstractChapterRepository {
  abstract findChapterBySource(source: string): Promise<Chapter>;
  abstract createChapter(chapter: Chapter): Promise<Chapter>;
  abstract updateChapterById(chapter: Chapter): Promise<Chapter>;
}
