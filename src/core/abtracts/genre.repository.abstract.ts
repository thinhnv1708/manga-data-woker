import { Genre } from '@core/entities';

export abstract class AbstractGenreRepository {
  abstract findOneById(id: string): Promise<Genre>;
  abstract create(genre: Genre): Promise<Genre>;
}
