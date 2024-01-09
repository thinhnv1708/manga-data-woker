import { Genre } from '@core/entities';

export abstract class AbstractGenreRepository {
  abstract findGenreBySource(source: string): Promise<Genre>;
  abstract findGenresBySources(sources: string[]): Promise<Genre[]>;
  abstract createGenre(genre: Genre): Promise<Genre>;
  abstract updateGenreById(genre: Genre): Promise<Genre>;
}
