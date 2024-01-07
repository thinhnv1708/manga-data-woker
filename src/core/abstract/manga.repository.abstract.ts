import { Manga } from '@core/entities';

export abstract class AbstractMangaRepository {
  abstract updateOrCreate(genre: Manga): Promise<Manga>;
}
