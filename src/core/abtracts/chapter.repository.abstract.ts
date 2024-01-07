import { Chapter } from '@core/entities';

export abstract class AbstractChapterRepository {
  abstract updateOrCreate(genre: Chapter): Promise<Chapter>;
}
