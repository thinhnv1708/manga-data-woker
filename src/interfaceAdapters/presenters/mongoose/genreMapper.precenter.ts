import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { GenreDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class GenreMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(genreDocument: GenreDocument): Genre {
    if (!genreDocument) {
      return null;
    }

    const { id, path, title, createdAt, updatedAt } = genreDocument;
    const newGenre = new Genre(id, path, title, createdAt, updatedAt);

    return newGenre;
  }
}
