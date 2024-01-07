import { Genre } from '@core/entities';
import { GenreDocument } from '../genre.mongooseSchema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(genreDocument: GenreDocument): Genre {
    const { id, title, createdAt, updatedAt } = genreDocument;
    const newGenre = new Genre(id, title, createdAt, updatedAt);

    return newGenre;
  }
}
