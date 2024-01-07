import { Genre } from '@core/entities';

export abstract class AbstractGenreRepository {
  abstract updateOrCreate(genre: Genre): Promise<Genre>;
}
