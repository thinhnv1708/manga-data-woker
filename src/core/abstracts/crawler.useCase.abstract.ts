export abstract class AbstractCrawlerUseCase {
  abstract crawlerGenre(html: string): Promise<void>;
  abstract crawlerManga(html: string): Promise<void>;
  abstract crawlerChapter(html: string): Promise<void>;
  abstract crawlerListManga(html: string): Promise<void>;
}
