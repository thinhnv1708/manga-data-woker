import { Manga } from '@core/entities';

export abstract class AbstractMangaRepository {
  abstract findMangaByPath(path: string): Promise<Manga>;
  abstract createManga(manga: Manga): Promise<Manga>;
  abstract updateManga(manga: Manga): Promise<Manga>;
}
