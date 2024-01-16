import { Manga } from '@core/entities';

export abstract class AbstractMangaRepository {
  abstract findMangaByPath(path: string): Promise<Manga>;
  abstract createManga(manga: Manga): Promise<Manga>;
  abstract updateManga(manga: Manga): Promise<Manga>;
  abstract findMangaPathsMissingTitle(
    page: number,
    limit: number,
  ): Promise<string[]>;
  abstract findTotalMangaPathsMissingTitle(): Promise<number>;
}
