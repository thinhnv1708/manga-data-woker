import { Genre } from '@core/entities';

export abstract class AbstractGenreRepository {
  abstract findGenreByPath(path: string): Promise<Genre>;
  abstract findGenresByPaths(paths: string[]): Promise<Genre[]>;
  abstract createGenre(genre: Genre): Promise<Genre>;
  abstract updateGenreById(genre: Genre): Promise<Genre>;
}
