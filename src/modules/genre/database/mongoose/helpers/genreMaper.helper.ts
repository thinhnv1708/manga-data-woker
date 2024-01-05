import { Genre } from '@core/entities';
import { GenreDocument } from '../genre.mongooseSchema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(genreDocument: GenreDocument): Genre {
    const { id, title, slug, createdAt, updatedAt } = genreDocument;
    const newGenre = new Genre();
    newGenre.setId(id);
    newGenre.setTitle(title);
    newGenre.setSlug(slug);
    newGenre.setCreatedAt(createdAt);
    newGenre.setUpdatedAt(updatedAt);
    return newGenre;
  }
}
